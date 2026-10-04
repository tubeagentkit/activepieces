import { PieceAuth } from '@activepieces/pieces-framework';
import { GetYoutubeTranscriptApiError, getYoutubeTranscriptRequest } from './common/client';

const markdownDescription = `
Sign up at [GetYouTubeTranscript](https://getyoutubetranscript.com) and create an API key in the [dashboard](https://getyoutubetranscript.com/dashboard). New accounts include free credits.
`;

export const getYoutubeTranscriptAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: markdownDescription,
  required: true,
  validate: async ({ auth }) => {
    try {
      // /credits costs no credits, so validating a key is free.
      await getYoutubeTranscriptRequest(auth, '/credits');
      return { valid: true };
    } catch (error) {
      // Only a 401 means the key is wrong; an outage must not prompt users to replace a working key.
      if (error instanceof GetYoutubeTranscriptApiError && error.status === 401) {
        return { valid: false, error: 'Invalid API key.' };
      }
      return {
        valid: false,
        error: `Could not check the API key right now. Please try again. (${(error as Error).message})`,
      };
    }
  },
});
