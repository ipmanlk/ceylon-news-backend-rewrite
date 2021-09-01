import { Source, Post } from "types/types.ts";
import * as parse from "util/parse.ts";
import { DateTime } from "luxon/mod.ts";

export const scrape = async (source: Source): Promise<Array<Post>> => {
	try {
		const entries = await parse.parseFiveFiltersRSSfeed(source.url);
		const createdLkDate = DateTime.local()
			.setZone("Asia/Colombo")
			.toFormat("yyyy-LL-dd hh:mm a");
		const posts = entries
			.map((entry) => {
				return {
					title: entry.title,
					content: entry.content,
					url: entry.url,
					language: source.language,
					sourceName: source.name.toLowerCase(),
					createdLkDate: createdLkDate,
					createdDate: new Date(),
					thumbnailUrl: entry.thumbnailUrl,
				};
			})
			.filter(
				(entry) => entry.title != "" && entry.content != "" && entry.url != ""
			);
		return posts;
	} catch (e) {
		console.log(e);
		return [];
	}
};
