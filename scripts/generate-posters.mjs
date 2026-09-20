// One-off script: extracts a poster frame (jpg) from each patient-care video.
// Run manually with `node scripts/generate-posters.mjs` — not part of the build pipeline.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { extname, join, basename } from "node:path";
import ffmpegPath from "ffmpeg-static";

const assetsDir = join(import.meta.dirname, "..", "src", "assets", "patient-care");

const videos = readdirSync(assetsDir).filter((file) => extname(file) === ".mp4");

for (const file of videos) {
  const input = join(assetsDir, file);
  const output = join(assetsDir, `${basename(file, ".mp4")}-poster.jpg`);
  const result = spawnSync(
    ffmpegPath,
    ["-y", "-ss", "0.1", "-i", input, "-frames:v", "1", "-q:v", "3", output],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${file}`);
  }
  console.log(`Generated ${basename(output)}`);
}
