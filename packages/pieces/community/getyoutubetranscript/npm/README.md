# @tubeagentkit/piece-getyoutubetranscript

An [Activepieces](https://www.activepieces.com) piece for the [GetYouTubeTranscript](https://getyoutubetranscript.com) API. Use it in flows or give it to Activepieces AI agents.

| Action | What it does |
| --- | --- |
| Get Transcript | Transcript of a YouTube video (URL or ID), with title and channel. **Include Timestamps** adds one `{start, duration, text}` segment per caption line. |
| Search YouTube | Videos or channels for a query, with a page token for the next page. |
| List Channel Videos | A channel's videos (by @handle, URL or ID), newest first, with a continuation token for the next page. |

All actions are read-only and include AI metadata, so they work as agent tools.

## Install in Activepieces

In Activepieces, go to **Settings > My Pieces > Install Piece** and enter `@tubeagentkit/piece-getyoutubetranscript`.

## Connect

Create an API key at [getyoutubetranscript.com/dashboard](https://getyoutubetranscript.com/dashboard) (free tier included) and paste it into the connection. The key is checked against the free `/credits` endpoint.

## Notes

- Each transcript, search or channel page uses one credit. Failed requests are not charged.
- The API fetches transcripts on its own servers, so it works without proxies and without `RequestBlocked` / `IpBlocked` errors.
- Source: [tubeagentkit/activepieces](https://github.com/tubeagentkit/activepieces/tree/add-getyoutubetranscript/packages/pieces/community/getyoutubetranscript)

License: MIT
