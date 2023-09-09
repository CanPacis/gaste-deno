import { join } from "https://deno.land/std@0.201.0/path/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { unZipFromFile } from "https://deno.land/x/zip@v1.1.0/unzip.ts";

const release = {
  linux:
    "https://github.com/CanPacis/gaste/releases/download/v0.0.1/server.zip",
} as Record<string, string>;

const platform = os.platform();
const url = release[platform];

if (!url) {
  throw new Error(`Unsupported platform ${platform}`);
}

const executable = await fetch(release.linux)
Deno.writeFile("server.zip", new Uint8Array(await executable.arrayBuffer()))
await unZipFromFile("server.zip", "./");

const command = new Deno.Command(join(Deno.cwd(), "./server"), {
  args: ["serve"],
});

await command.output();
