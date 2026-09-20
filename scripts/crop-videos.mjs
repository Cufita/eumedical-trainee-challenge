// One-off script: crops the baked-in frame/border out of each patient-care
// source video (they were exported from Figma with an extra bezel around the
// real content). Run manually with `node scripts/crop-videos.mjs`.
import { spawnSync } from "node:child_process";
import { readdirSync, renameSync } from "node:fs";
import { extname, join, basename } from "node:path";
import ffmpegPath from "ffmpeg-static";

const assetsDir = join(import.meta.dirname, "..", "src", "assets", "patient-care");
// First pass (1238x650 -> 1190x614) removed the obvious black/gray bezel;
// a faint rounded-corner sliver of it still showed through at the very
// edge, so this second pass trims another 18px per side (-> 1154x578).
const CROP = "crop=1154:578:18:18";

const videos = readdirSync(assetsDir).filter((file) => extname(file) === ".mp4");

for (const file of videos) {
  const input = join(assetsDir, file);
  const tmp = join(assetsDir, `${basename(file, ".mp4")}.tmp.mp4`);
  const result = spawnSync(
    ffmpegPath,
    ["-y", "-i", input, "-vf", CROP, "-an", "-c:v", "libx264", "-crf", "18", "-preset", "slow", tmp],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg crop failed for ${file}`);
  }
  renameSync(tmp, input);
  console.log(`Cropped ${file}`);
}
