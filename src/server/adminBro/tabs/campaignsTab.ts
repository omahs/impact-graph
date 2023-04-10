import { Campaign } from '../../../entities/campaign';
import {
  canAccessCampaignAction,
  ResourceActions,
} from '../adminBroPermissions';

export const campaignsTab = {
  resource: Campaign,
  options: {
    actions: {
      delete: {
        isVisible: true,
        isAccessible: ({ currentAdmin }) =>
          canAccessCampaignAction({ currentAdmin }, ResourceActions.DELETE),
      },
      new: {
        isVisible: true,
        isAccessible: ({ currentAdmin }) =>
          canAccessCampaignAction({ currentAdmin }, ResourceActions.NEW),
      },
      edit: {
        isVisible: true,
        isAccessible: ({ currentAdmin }) =>
          canAccessCampaignAction({ currentAdmin }, ResourceActions.EDIT),
      },
      bulkDelete: {
        isVisible: false,
        isAccessible: ({ currentAdmin }) =>
          canAccessCampaignAction(
            { currentAdmin },
            ResourceActions.BULK_DELETE,
          ),
      },
    },
    properties: {
      slug: {
        isVisible: true,
      },
      title: {
        isVisible: true,
      },
      type: {
        isVisible: true,
      },
      description: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      hashtags: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      photo: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      video: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      videoPreview: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      relatedProjectsSlugs: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      landingLink: {
        isVisible: true,
      },
      order: {
        isVisible: true,
      },
      isActive: {
        isVisible: true,
      },
      isFeatured: {
        isVisible: true,
      },
      isNew: {
        isVisible: true,
      },
      filterFields: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      sortingField: {
        isVisible: {
          show: true,
          list: false,
          new: false,
          edit: true,
        },
      },
      createdAt: {
        isVisible: {
          show: true,
          list: true,
          new: false,
          edit: false,
        },
      },
      updatedAt: {
        isVisible: {
          show: true,
          list: true,
          new: false,
          edit: false,
        },
      },
    },
  },
};
