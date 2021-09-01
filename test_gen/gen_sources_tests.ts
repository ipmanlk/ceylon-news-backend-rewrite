// deno-lint-ignore-file
import { sources } from "sources/sources.ts";
import * as path from "std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const cases: Array<string> = [];

sources.forEach((source, index) => {
	if (!source.enabled || source.provider != "rss_provider.ts") return;
	cases.push(`
  const source${index} = ${JSON.stringify(source)} as any;
  Deno.test("source: ${source.name}-${source.language}", async () => {
		  const posts = await rssProvider.scrape(source${index});
		  assertNotEquals(posts.length, 0);
  });
  `);
});

let testFileHeader = `
import { assertNotEquals } from "std/testing/asserts.ts";
import * as rssProvider from "providers/rss_provider.ts";
`;

Deno.writeTextFileSync(
	`${__dirname}/../src/scraper/sources/sources.test.ts`,
	testFileHeader + "\n\n" + cases.join("\n")
);
