// Turns the Activepieces bundle in ../dist into the published npm package:
// sets our scoped name, the version from the release tag, npm metadata, and the README.
// Usage: node npm/prepare-dist.mjs <version>
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) throw new Error(`Expected a version like 0.1.1, got "${version}"`);

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '..', 'dist');
const pkgPath = join(dist, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
if (pkg.main !== './src/index.js') throw new Error('dist is not an Activepieces bundle; run the bundle step first');

Object.assign(pkg, {
  name: '@tubeagentkit/piece-getyoutubetranscript',
  version,
  description:
    'Activepieces piece for YouTube transcripts: get YouTube video transcripts with timestamps, search YouTube, and list channel videos, via the GetYouTubeTranscript API.',
  keywords: ['activepieces', 'activepieces-piece', 'youtube', 'youtube-transcript', 'transcript', 'captions', 'subtitles', 'automation', 'ai-agents'],
  license: 'MIT',
  homepage: 'https://getyoutubetranscript.com',
  repository: {
    type: 'git',
    url: 'git+https://github.com/tubeagentkit/activepieces.git',
    directory: 'packages/pieces/community/getyoutubetranscript',
  },
  author: 'tubeagentkit',
});
if (!pkg.files.includes('README.md')) pkg.files.push('README.md');
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
copyFileSync(join(here, 'README.md'), join(dist, 'README.md'));
console.log(`Prepared ${pkg.name}@${version} in ${dist}`);
