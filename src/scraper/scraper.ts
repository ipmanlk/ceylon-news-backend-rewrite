import { sources } from "sources/sources.ts";
import { savePosts } from "data/data.ts";
import { sendUpdates } from "mailman/mailman.ts";
import { Post, Provider } from "types/types.ts";

export const startScraper = () => {
	scrapeSources().catch((e) => console.log(e));
	setInterval(() => {
		scrapeSources().catch((e) => console.log(e));
	}, 20 * 60000);
};

const scrapeSources = async () => {
	let posts: Array<Post> = [];

	for (const source of sources) {
		try {
			console.log(`scraping: ${source.name}-${source.language}`);
			const provider: Provider = await import(`providers/${source.provider}`);
			const sourcePosts = await provider.scrape(source);
			posts = posts.concat(sourcePosts);
		} catch (e) {
			console.log(e);
		}
	}

	// send updates to ws clients
	const newPosts = await savePosts(posts);
	sendUpdates(newPosts);
};
