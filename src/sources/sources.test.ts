// deno-lint-ignore-file
import { assertNotEquals } from "std/testing/asserts.ts";
import * as rssProvider from "providers/rss_provider.ts";

const source0 = {
	name: "BBC Sinhala",
	language: "si",
	url: "https://tinyurl.com/wlvo8td",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: BBC Sinhala-si", async () => {
	const posts = await rssProvider.scrape(source0);
	assertNotEquals(posts.length, 0);
});

const source1 = {
	name: "Neth News",
	language: "si",
	url: "https://tinyurl.com/spyq9lx",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Neth News-si", async () => {
	const posts = await rssProvider.scrape(source1);
	assertNotEquals(posts.length, 0);
});

const source2 = {
	name: "News.lk",
	language: "si",
	url: "https://tinyurl.com/y35lznud",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: News.lk-si", async () => {
	const posts = await rssProvider.scrape(source2);
	assertNotEquals(posts.length, 0);
});

const source5 = {
	name: "Daily News",
	language: "en",
	url: "https://tinyurl.com/y6qkfp9b",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Daily News-en", async () => {
	const posts = await rssProvider.scrape(source5);
	assertNotEquals(posts.length, 0);
});

const source6 = {
	name: "News.lk",
	language: "en",
	url: "https://tinyurl.com/w28nfht",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: News.lk-en", async () => {
	const posts = await rssProvider.scrape(source6);
	assertNotEquals(posts.length, 0);
});

const source8 = {
	name: "JVP News",
	language: "ta",
	url: "https://tinyurl.com/uws8hxb",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: JVP News-ta", async () => {
	const posts = await rssProvider.scrape(source8);
	assertNotEquals(posts.length, 0);
});

const source9 = {
	name: "Tamilwin",
	language: "ta",
	url: "https://tinyurl.com/ulugr2w",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Tamilwin-ta", async () => {
	const posts = await rssProvider.scrape(source9);
	assertNotEquals(posts.length, 0);
});

const source10 = {
	name: "BBC",
	language: "ta",
	url: "https://tinyurl.com/vjh89nj",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: BBC-ta", async () => {
	const posts = await rssProvider.scrape(source10);
	assertNotEquals(posts.length, 0);
});

const source11 = {
	name: "Srilanka Mirror",
	language: "en",
	url: "https://tinyurl.com/v7ag5x9",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Srilanka Mirror-en", async () => {
	const posts = await rssProvider.scrape(source11);
	assertNotEquals(posts.length, 0);
});

const source12 = {
	name: "Dinamina",
	language: "si",
	url: "https://tinyurl.com/ydfs3wv3",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Dinamina-si", async () => {
	const posts = await rssProvider.scrape(source12);
	assertNotEquals(posts.length, 0);
});

const source13 = {
	name: "Sunday Observer",
	language: "en",
	url: "https://tinyurl.com/uzoj5dy",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Sunday Observer-en", async () => {
	const posts = await rssProvider.scrape(source13);
	assertNotEquals(posts.length, 0);
});

const source14 = {
	name: "BBC",
	language: "en",
	url: "https://tinyurl.com/w2juyax",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: BBC-en", async () => {
	const posts = await rssProvider.scrape(source14);
	assertNotEquals(posts.length, 0);
});

const source15 = {
	name: "Lanka Puvath",
	language: "si",
	url: "https://tinyurl.com/txz9gtp",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Lanka Puvath-si", async () => {
	const posts = await rssProvider.scrape(source15);
	assertNotEquals(posts.length, 0);
});

const source16 = {
	name: "Colombo Page",
	language: "en",
	url: "https://tinyurl.com/upttpum",
	provider: "rss_provider.ts",
	enabled: true,
} as any;
Deno.test("source: Colombo Page-en", async () => {
	const posts = await rssProvider.scrape(source16);
	assertNotEquals(posts.length, 0);
});
