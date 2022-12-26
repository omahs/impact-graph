import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from 'type-graphql';
import { MyContext } from '../types/MyContext';
import {
  errorMessages,
  i18n,
  translationErrorMessagesKeys,
} from '../utils/errorMessages';
import { PowerBoosting } from '../entities/powerBoosting';
import {
  setMultipleBoosting,
  setSingleBoosting,
  findPowerBoostings,
} from '../repositories/powerBoostingRepository';
import { Max, Min } from 'class-validator';
import { Service } from 'typedi';
import { OrderField, Project, SortingField } from '../entities/project';
import { logger } from '../utils/logger';
import { getBottomRank } from '../repositories/projectPowerViewRepository';
import { getNotificationAdapter } from '../adapters/adaptersFactory';
import { findProjectById } from '../repositories/projectRepository';

enum PowerBoostingOrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum PowerBoostingOrderField {
  CreationAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Percentage = 'percentage',
}

registerEnumType(PowerBoostingOrderField, {
  name: 'PowerBoostingOrderField',
  description: 'Order by field',
});

registerEnumType(PowerBoostingOrderDirection, {
  name: 'PowerBoostingOrderDirection',
  description: 'Order direction',
});

@InputType()
class PowerBoostingOrderBy {
  @Field(type => PowerBoostingOrderField, {
    nullable: true,
    defaultValue: PowerBoostingOrderField.UpdatedAt,
  })
  field: PowerBoostingOrderField;

  @Field(type => PowerBoostingOrderDirection, {
    nullable: true,
    defaultValue: PowerBoostingOrderDirection.DESC,
  })
  direction: PowerBoostingOrderDirection;
}

@Service()
@ArgsType()
export class GetPowerBoostingArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(type => Int, { defaultValue: 20 })
  @Min(0)
  @Max(50)
  take: number;

  @Field(type => PowerBoostingOrderBy, {
    nullable: true,
    defaultValue: {
      field: PowerBoostingOrderField.UpdatedAt,
      direction: PowerBoostingOrderDirection.DESC,
    },
  })
  orderBy: PowerBoostingOrderBy;

  @Field(type => Int, { nullable: true })
  projectId?: number;

  @Field(type => Int, { nullable: true })
  userId?: number;
}

@ObjectType()
class GivPowers {
  @Field(type => [PowerBoosting])
  powerBoostings: PowerBoosting[];

  @Field(type => Int)
  totalCount: number;
}

@Resolver(of => PowerBoosting)
export class PowerBoostingResolver {
  @Mutation(returns => [PowerBoosting])
  async setMultiplePowerBoosting(
    @Arg('projectIds', type => [Int]) projectIds: number[],
    @Arg('percentages', type => [Float]) percentages: number[],
    @Ctx() { req: { user } }: MyContext,
  ): Promise<PowerBoosting[]> {
    const userId = user?.userId;
    if (!user || !userId) {
      throw new Error(
        i18n.__(translationErrorMessagesKeys.AUTHENTICATION_REQUIRED),
      );
    }

    // validator: sum of percentages should not be more than 100, all projects should active, ...
    const result = await setMultipleBoosting({
      userId,
      projectIds,
      percentages,
    });

    await getNotificationAdapter().projectBoostedBatch({
      userId,
      projectIds,
    });
    return result;
  }

  @Mutation(returns => [PowerBoosting])
  async setSinglePowerBoosting(
    @Arg('projectId', type => Int) projectId: number,
    @Arg('percentage', type => Float) percentage: number,
    @Ctx() { req: { user } }: MyContext,
  ): Promise<PowerBoosting[]> {
    const userId = user?.userId;
    if (!user || !userId) {
      throw new Error(
        i18n.__(translationErrorMessagesKeys.AUTHENTICATION_REQUIRED),
      );
    }

    const result = await setSingleBoosting({
      userId,
      projectId,
      percentage,
    });
    const project = (await findProjectById(projectId)) as Project;
    await getNotificationAdapter().projectBoosted({ project, userId });
    return result;
  }

  @Query(returns => GivPowers)
  async getPowerBoosting(
    @Args()
    { take, skip, projectId, userId, orderBy }: GetPowerBoostingArgs,
  ): Promise<GivPowers> {
    if (!projectId && !userId) {
      throw new Error(
        i18n.__(
          translationErrorMessagesKeys.SHOULD_SEND_AT_LEAST_ONE_OF_PROJECT_ID_AND_USER_ID,
        ),
      );
    }
    const [powerBoostings, totalCount] = await findPowerBoostings({
      userId,
      projectId,
      skip,
      orderBy,
      take,
    });
    return {
      powerBoostings,
      totalCount,
    };
  }

  @Query(returns => Number)
  async getTopPowerRank(): Promise<Number> {
    return getBottomRank();
  }
}
