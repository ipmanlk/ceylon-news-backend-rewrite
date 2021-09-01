import "dotenv/load.ts";
import { startAPI } from "api/server.ts";
import { startScraper } from "scraper/scraper.ts";
import { initializeDB } from "data/data.ts";

await initializeDB();
startScraper();
await startAPI();
