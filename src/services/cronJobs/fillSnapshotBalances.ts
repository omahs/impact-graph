import Bull from 'bull';
import { redisConfig } from '../../redis';
import { logger } from '../../utils/logger';
import config from '../../config';
import { schedule } from 'node-cron';
import { getPowerBalanceAggregatorAdapter } from '../../adapters/adaptersFactory';
import { getPowerBoostingSnapshotWithoutBalance } from '../../repositories/powerSnapshotRepository';
import { addOrUpdatePowerSnapshotBalances } from '../../repositories/powerBalanceSnapshotRepository';

const fillSnapshotBalanceQueue = new Bull<FillSnapShotBalanceData>(
  'fill-snapshot-balance-aggregator',
  {
    redis: redisConfig,
  },
);
const TWO_MINUTES = 1000 * 60 * 2;
setInterval(async () => {
  const fillSnapshotBalanceQueueCount = await fillSnapshotBalanceQueue.count();
  logger.debug(`Fill power snapshot balance queues count:`, {
    fillSnapshotBalanceQueueCount,
  });
}, TWO_MINUTES);

const numberOfFillPowerSnapshotBalancesConcurrentJob =
  Number(
    config.get('NUMBER_OF_FILLING_POWER_SNAPSHOT_BALANCE_CONCURRENT_JOB'),
  ) || 1;

const cronJobTime =
  (config.get('FILL_POWER_SNAPSHOT_BALANCE_CRONJOB_EXPRESSION') as string) ||
  '0 0 * * * *';

export const runFillPowerSnapshotBalanceCronJob = () => {
  logger.debug(
    'runSyncUserPowersCronJob() has been called, cronJobTime',
    cronJobTime,
  );
  processFillPowerSnapshotJobs();
  // https://github.com/node-cron/node-cron#cron-syntax
  schedule(cronJobTime, async () => {
    await addFillPowerSnapshotBalanceJobsToQueue();
  });
};

export async function addFillPowerSnapshotBalanceJobsToQueue() {
  let offset = 0;
  let isFinished = false;

  let groupByTimestamp: {
    [timestamp: number]: {
      userId: number;
      powerSnapshotId: number;
      walletAddress: string;
    }[];
  } = {};

  while (!isFinished) {
    const powerBoostings = await getPowerBoostingSnapshotWithoutBalance(
      100,
      offset,
    );
    powerBoostings.forEach(pb => {
      // const timestampInStr = String(Math.floor(pb.time.getTime() / 1000));
      const timestampInStr = String(pb.time.getTime());
      if (groupByTimestamp[timestampInStr]) {
        groupByTimestamp[timestampInStr].push(pb);
      } else {
        groupByTimestamp[timestampInStr] = [pb];
      }
    });
    // logger.debug('Trying to fill incomplete powerBoostingSnapshots', {
    //   offset,
    //   powerBoostingsLength: powerBoostings?.length,
    // });
    if (powerBoostings.length === 0) {
      // logger.debug('isFinished true', {
      //   offset,
      // });
      isFinished = true;
      break;
    }
    offset += powerBoostings.length;

    // logger.debug('**powerBoostings**', powerBoostings);
    // logger.debug('groupByTimestamp', groupByTimestamp);
  }

  Object.keys(groupByTimestamp).forEach(key => {
    const powerSnapshotId = groupByTimestamp[key][0].powerSnapshotId;
    // logger.debug('inside forEach', {
    //   timestamp: Number(key),
    //   powerSnapshotId,
    // });
    const jobData = {
      timestamp: Number(key),
      // timestamp: Number(Math.floor(Number(key) / 1000)),
      powerSnapshotId,
      data: groupByTimestamp[key].map(pb => {
        return {
          userId: pb.userId,
          walletAddress: pb.walletAddress.toLowerCase(),
        };
      }),
    };
    // logger.debug('job data', jobData);
    fillSnapshotBalanceQueue.add(jobData);
  });
  groupByTimestamp = {};
}

export function processFillPowerSnapshotJobs() {
  fillSnapshotBalanceQueue.process(
    numberOfFillPowerSnapshotBalancesConcurrentJob,
    async (job, done) => {
      const items = job.data.data;
      const { timestamp, powerSnapshotId } = job.data;
      try {
        const addresses = items.map(item => item.walletAddress);
        const balanceAggregatorBatchNumber = Number(
          process.env.NUMBER_OF_BALANCE_AGGREGATOR_BATCH,
        );
        logger.debug('**addresses**', {
          powerSnapshotId,
          addresses,
          batchIndex: addresses.length / balanceAggregatorBatchNumber,
        });

        for (
          let i = 0;
          i < addresses.length / balanceAggregatorBatchNumber;
          i++
        ) {
          logger.debug('sentAddresses index', {
            maxIndex: addresses.length / balanceAggregatorBatchNumber,
            i,
            'i * balanceAggregatorBatchNumber':
              i * balanceAggregatorBatchNumber,
          });
          const sentAddresses = addresses.slice(
            i * balanceAggregatorBatchNumber,
            (i + 1) * balanceAggregatorBatchNumber,
          );
          logger.debug('sentAddresses ', {
            sentAddresses,
          });
          const balances =
            await getPowerBalanceAggregatorAdapter().getAddressesBalance({
              timestamp,
              addresses: sentAddresses,
            });

          await addOrUpdatePowerSnapshotBalances(
            balances.map(balance => {
              return {
                balance: balance.balance,
                powerSnapshotId,
                userId: items.find(
                  item =>
                    item.walletAddress.toLowerCase() ===
                    balance.address.toLowerCase(),
                )!.userId,
              };
            }),
          );
        }
      } catch (e) {
        logger.error('processFillPowerSnapshotJobs >> error', e);
      } finally {
        done();
      }
    },
  );
}

interface FillSnapShotBalanceData {
  timestamp: number;
  powerSnapshotId: number;
  data: {
    userId: number;
    walletAddress: string;
  }[];
}
