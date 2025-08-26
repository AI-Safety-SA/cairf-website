import { Client } from "@notionhq/client";
import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import https from "https";

// Load environment variables from .env file
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;
const OUT_DIR = "src/assets/mentors";
const OUT_FILE = "mentors.json";
const IMAGES_DIR = "public/mentors/images";

type Mentor = {
  name: string;
  title: string;
  website?: string;
  linkedin?: string;
  academic?: string;
  image?: string;
};

function getText(rich: any[]): string {
  return rich.map((r) => r.plain_text ?? "").join("");
}

function getUrl(rich: any): string | undefined {
  // Handle URL type
  if (rich?.url) {
    return rich.url;
  }

  // Handle files type (Notion file uploads)
  if (rich?.type === "files" && rich.files && rich.files.length > 0) {
    const file = rich.files[0];
    if (file.type === "file" && file.file?.url) {
      return file.file.url;
    }
  }

  return undefined;
}

async function ensureDir(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function downloadImage(
  url: string,
  filename: string
): Promise<string | undefined> {
  try {
    const imagePath = path.join(IMAGES_DIR, filename);

    // Check if image already exists
    try {
      await fs.access(imagePath);
      console.log(`Image already exists: ${filename}`);
      return `./mentors/images/${filename}`;
    } catch {
      // Image doesn't exist, download it
    }

    return new Promise((resolve, reject) => {
      https
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(
              new Error(`Failed to download image: ${response.statusCode}`)
            );
            return;
          }

          const fileStream = createWriteStream(imagePath);
          response.pipe(fileStream);

          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`Downloaded image: ${filename}`);
            resolve(`./mentors/images/${filename}`);
          });

          fileStream.on("error", (err: Error) => {
            reject(err);
          });
        })
        .on("error", (err: Error) => {
          reject(err);
        });
    });
  } catch (error) {
    console.warn(`Failed to download image for ${filename}:`, error);
    return undefined;
  }
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

async function fetchAllPages() {
  const results: any[] = [];
  let cursor: string | undefined = undefined;

  while (true) {
    const resp = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });

    results.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor ?? undefined;
  }
  return results;
}

async function mapPage(p: any): Promise<Mentor | null> {
  const props = p.properties;

  const name = getText(props["Full name"]?.rich_text ?? []);
  const title = getText(props["Affiliation"]?.rich_text ?? []);
  const website = getUrl(props["Link to website"]);
  const linkedin = getUrl(props["LinkedIn"]);
  const academic = getUrl(props["GoogleScholar"]);
  const imageUrl = getUrl(props["Picture"]);

  if (!name || !title) return null;

  // Download image if URL exists
  let localImagePath: string | undefined;
  if (imageUrl) {
    const filename = `${sanitizeFilename(name)}.jpg`;
    localImagePath = await downloadImage(imageUrl, filename);
  }

  return {
    name,
    title,
    website: website || undefined,
    linkedin: linkedin || undefined,
    academic: academic || undefined,
    image: localImagePath || undefined,
  };
}

async function main() {
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not set");
  }

  const pages = await fetchAllPages();

  // Ensure directories exist
  await ensureDir(OUT_DIR);
  await ensureDir(IMAGES_DIR);

  // Map pages to mentor objects
  const mentors: Mentor[] = [];
  for (const page of pages) {
    const mapped = await mapPage(page);
    if (mapped) mentors.push(mapped);
  }

  const outPath = path.join(OUT_DIR, OUT_FILE);
  await fs.writeFile(outPath, JSON.stringify(mentors, null, 2), "utf-8");

  console.log(`Wrote ${mentors.length} mentor entries to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
