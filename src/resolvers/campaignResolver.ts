import {
  Arg,
  Ctx,
  Field,
  Int,
  Query,
  registerEnumType,
  Resolver,
} from 'type-graphql';
import {
  Campaign,
  CampaignFilterField,
  CampaignSortingField,
} from '../entities/campaign';
import {
  findAllActiveCampaigns,
  findCampaignBySlug,
  findFeaturedCampaign,
} from '../repositories/campaignRepository';
import { ApolloContext } from '../types/ApolloContext';
import { errorMessages } from '../utils/errorMessages';
import { fillCampaignProjects } from '../services/campaignService';

registerEnumType(CampaignSortingField, {
  name: 'CampaignSortingField',
  description: 'Same sorting fields like projects',
});

registerEnumType(CampaignFilterField, {
  name: 'CampaignFilterField',
  description: 'Same filter fields like projects',
});

@Resolver(of => Campaign)
export class CampaignResolver {
  @Query(returns => [Campaign], { nullable: true })
  async campaigns(
    @Ctx() { req: { user }, projectsFiltersThreadPool }: ApolloContext,
    @Arg('connectedWalletUserId', { nullable: true })
    connectedWalletUserId?: number,
  ) {
    const userId = connectedWalletUserId || user?.userId;
    const campaigns = await findAllActiveCampaigns();
    return Promise.all(
      campaigns?.map(campaign => fillCampaignProjects({ campaign, userId })),
    );
  }

  @Query(returns => Campaign, { nullable: true })
  async findCampaignBySlug(
    @Ctx()
    { req: { user }, projectsFiltersThreadPool }: ApolloContext,
    @Arg('connectedWalletUserId', { nullable: true })
    connectedWalletUserId?: number,
    @Arg('skip', type => Int, { nullable: true }) skip?: number,
    @Arg('limit', type => Int, { nullable: true }) limit?: number,

    // If user dont send slug, we return first featured campaign
    @Arg('slug', { nullable: true }) slug?: string,
  ) {
    // TODO Write test cases
    let campaign: Campaign | null;
    if (slug) {
      campaign = await findCampaignBySlug(slug);
      if (!campaign) {
        throw new Error(errorMessages.CAMPAIGN_NOT_FOUND);
      }
    } else {
      campaign = await findFeaturedCampaign();
      if (!campaign) {
        throw new Error(errorMessages.THERE_IS_NOT_ANY_FEATURED_CAMPAIGN);
      }
    }

    const userId = connectedWalletUserId || user?.userId;
    return fillCampaignProjects({ campaign, userId, skip, limit });
  }
}
