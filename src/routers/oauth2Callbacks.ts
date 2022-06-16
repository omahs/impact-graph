import express, { Request, Response } from 'express';
import { handleExpressError } from './standardError';
import { logger } from '../utils/logger';
import { SOCIAL_NETWORKS } from '../entities/socialProfile';
import { oauth2CallbackHandler } from '../services/socialProfileService';
import { findProjectVerificationFormById } from '../repositories/projectVerificationRepository';

export const oauth2CallbacksRouter = express.Router();

const dappBaseUrl = `${process.env.GIVETH_IO_DAPP_BASE_URL}`;
export const SOCIAL_PROFILES_PREFIX = '/socialProfiles';
const generateDappVerificationUrl = async (params: {
  projectVerificationId: number;
  success: boolean;
  message?: string;
}): Promise<string> => {
  const { projectVerificationId, success, message } = params;
  const projectVerificationForm = await findProjectVerificationFormById(
    projectVerificationId,
  );
  return `${dappBaseUrl}/${projectVerificationForm?.project?.slug}?success=${success}&message=${message}`;
};

oauth2CallbacksRouter.get(
  `/callback/discord`,
  async (request: Request, response: Response) => {
    let projectVerificationId;
    try {
      logger.info('/callback/discord pramas', {
        query: request.query,
        url: request.url,
        params: request.params,
        originalUrl: request.originalUrl,
        x: request.route,
      });
      const { state, access_token } = request.query;

      if (access_token) {
        // should handle failed error and redirect to html
        const socialProfile = await oauth2CallbackHandler({
          socialNetwork: SOCIAL_NETWORKS.DISCORD,
          state: state as string,
          authorizationCodeOrAccessToken: decodeURI(access_token as string),
        });
        projectVerificationId = socialProfile.projectVerificationForm.id;
        response.redirect(
          await generateDappVerificationUrl({
            success: true,
            projectVerificationId,
          }),
        );
      } else {
        // Because discord redirects and pass params as URI_fragment and browser doesnt send it to server
        // So I had to return a html and redirect it to server with passing parameters as query string
        response.setHeader('Content-Type', 'text/html');
        response.send(`
        <div id='info'>Please wait ...</div>
        <a id='login' style='display: none;' href='your-oauth2-URL-here'>Identify Yourself</a>
        <script>
            window.onload = () => {
            const fragment = new URLSearchParams(window.location.hash.slice(1));
            const [accessToken, state] = [fragment.get('access_token'), fragment.get('state')];
        
            if (!accessToken) {
            return (document.getElementById('login').style.display = 'block');
            }
            console.log('accessToken', accessToken)

            window.open('/socialProfiles/callback/discord?state='+state +'&access_token='+accessToken, '_self')
        
            };
        </script>
  `);
      }
    } catch (e) {
      logger.error(`/callback/discord error`, e);
      if (projectVerificationId) {
        response.redirect(
          await generateDappVerificationUrl({
            success: false,
            message: e.message,
            projectVerificationId,
          }),
        );
      } else {
        response.redirect(dappBaseUrl);
      }
    }
  },
);

oauth2CallbacksRouter.get(
  `/callback/google`,
  async (request: Request, response: Response) => {
    let projectVerificationId;
    try {
      const socialProfile = await oauth2CallbackHandler({
        state: request.query.state as string,
        authorizationCodeOrAccessToken: decodeURI(request.query.code as string),
        socialNetwork: SOCIAL_NETWORKS.GOOGLE,
      });
      projectVerificationId = socialProfile.projectVerificationForm.id;
      response.redirect(
        await generateDappVerificationUrl({
          success: true,
          projectVerificationId,
        }),
      );
    } catch (e) {
      logger.error(`/callback/discord error`, e);
      if (projectVerificationId) {
        response.redirect(
          await generateDappVerificationUrl({
            success: false,
            message: e.message,
            projectVerificationId,
          }),
        );
      } else {
        response.redirect(dappBaseUrl);
      }
    }
  },
);
oauth2CallbacksRouter.get(
  `/callback/linkedin`,
  async (request: Request, response: Response) => {
    let projectVerificationId;
    try {
      const socialProfile = await oauth2CallbackHandler({
        state: request.query.state as string,
        authorizationCodeOrAccessToken: decodeURI(request.query.code as string),
        socialNetwork: SOCIAL_NETWORKS.LINKEDIN,
      });
      projectVerificationId = socialProfile.projectVerificationForm.id;
      response.redirect(
        await generateDappVerificationUrl({
          success: true,
          projectVerificationId,
        }),
      );
    } catch (e) {
      logger.error(`/callback/linkedin error`, e);
      if (projectVerificationId) {
        response.redirect(
          await generateDappVerificationUrl({
            success: false,
            message: e.message,
            projectVerificationId,
          }),
        );
      } else {
        response.redirect(dappBaseUrl);
      }
    }
  },
);
