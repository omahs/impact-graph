import BroadcastNotification, {
  BROAD_CAST_NOTIFICATION_STATUS,
} from '../entities/broadcastNotification';
import {
  updateBroadcastNotificationStatus,
  findBroadcastNotificationById,
} from './broadcastNotificationRepository';
import { assert } from 'chai';

describe(
  'updateBroadcastNotificationStatus test cases',
  updateBroadcastNotificationStatusTestCases,
);

function updateBroadcastNotificationStatusTestCases() {
  it('should update broadcast notification status to success', async () => {
    const bn = await BroadcastNotification.create({
      title: 'test',
      text: 'test',
      status: BROAD_CAST_NOTIFICATION_STATUS.PENDING,
      link: 'test',
      linkTitle: 'test',
    }).save();
    assert.equal(bn.status, BROAD_CAST_NOTIFICATION_STATUS.PENDING);
    await updateBroadcastNotificationStatus(
      bn.id,
      BROAD_CAST_NOTIFICATION_STATUS.SUCCESS,
    );
    const result = await findBroadcastNotificationById(bn.id);
    assert.equal(result?.status, BROAD_CAST_NOTIFICATION_STATUS.SUCCESS);
  });
  it('should update broadcast notification status to failed', async () => {
    const bn = await BroadcastNotification.create({
      title: 'test',
      text: 'test',
      status: BROAD_CAST_NOTIFICATION_STATUS.PENDING,
      link: 'test',
      linkTitle: 'test',
    }).save();
    assert.equal(bn.status, BROAD_CAST_NOTIFICATION_STATUS.PENDING);
    await updateBroadcastNotificationStatus(
      bn.id,
      BROAD_CAST_NOTIFICATION_STATUS.FAILED,
    );
    const result = await findBroadcastNotificationById(bn.id);
    assert.equal(result?.status, BROAD_CAST_NOTIFICATION_STATUS.FAILED);
  });
}
