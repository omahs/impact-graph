import { SocialNetworkOauth2AdapterInterface } from './oauth2/SocialNetworkOauth2AdapterInterface';
import { DiscordAdapter } from './oauth2/discordAdapter';
import { SOCIAL_NETWORKS } from '../entities/socialProfile';
import { errorMessages } from '../utils/errorMessages';
import { GoogleAdapter } from './oauth2/googleAdapter';
import { LinkedinAdapter } from './oauth2/linkedinAdapter';

const discordAdapter = new DiscordAdapter();
const googleAdapter = new GoogleAdapter();
const linkedinAdapter = new LinkedinAdapter();
export const getSocialNetworkAdapter = (
  socialNetwork: string,
): SocialNetworkOauth2AdapterInterface => {
  switch (socialNetwork) {
    case SOCIAL_NETWORKS.DISCORD:
      return discordAdapter;
    case SOCIAL_NETWORKS.GOOGLE:
      return googleAdapter;
    case SOCIAL_NETWORKS.LINKEDIN:
      return linkedinAdapter;
    default:
      throw new Error(errorMessages.INVALID_SOCIAL_NETWORK);
  }
};