import { HttpError, httpClient, HttpMethod, QueryParams } from '@activepieces/pieces-common';

export const getYoutubeTranscriptBaseUrl = 'https://getyoutubetranscript.com/api/v1';

/** A failed API call. `status` is the HTTP status, or 0 when the request never got a response. */
export class GetYoutubeTranscriptApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'GetYoutubeTranscriptApiError';
  }
}

type ApiBody<T> = { success?: boolean; data?: T; message?: string; code?: string };

/**
 * GET helper for the GetYouTubeTranscript REST API. Empty or undefined query
 * values are dropped so optional props never send blank parameters.
 * Responses look like { success, data }; this returns `data` and throws
 * GetYoutubeTranscriptApiError with the API's own message on any failure.
 */
export async function getYoutubeTranscriptRequest<T>(
  apiKey: string,
  path: string,
  query: Record<string, string | undefined> = {}
): Promise<T> {
  const queryParams: QueryParams = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') {
      queryParams[key] = value;
    }
  }

  let body: ApiBody<T>;
  try {
    const response = await httpClient.sendRequest<ApiBody<T>>({
      method: HttpMethod.GET,
      url: `${getYoutubeTranscriptBaseUrl}${path}`,
      headers: { Authorization: `Bearer ${apiKey}` },
      queryParams,
    });
    body = response.body;
  } catch (error) {
    if (error instanceof HttpError) {
      const errorBody = error.response.body as ApiBody<T> | undefined;
      const message = errorBody?.message ?? errorBody?.code ?? 'Request failed';
      throw new GetYoutubeTranscriptApiError(
        `GetYouTubeTranscript API error ${error.response.status}: ${message}`,
        error.response.status
      );
    }
    throw new GetYoutubeTranscriptApiError(
      `Could not reach GetYouTubeTranscript: ${error instanceof Error ? error.message : String(error)}`,
      0
    );
  }

  if (!body?.success || body.data === undefined) {
    throw new GetYoutubeTranscriptApiError(
      `GetYouTubeTranscript API error: ${body?.message ?? 'unexpected response'}`,
      200
    );
  }
  return body.data;
}
