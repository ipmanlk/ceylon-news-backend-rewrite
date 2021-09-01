import { assertNotEquals } from "std/testing/asserts.ts";
import * as rssProvider from "./rss_provider.ts";

Deno.test("rss provider", async () => {
	const posts = await rssProvider.scrape({
		name: "Daily News",
		language: "en",
		url: "https://tinyurl.com/y6qkfp9b",
		provider: "rss_provider.ts",
		enabled: true,
	});

	assertNotEquals(posts.length, 0);
});
