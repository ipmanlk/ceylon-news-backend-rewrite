import { cheerio } from "cheerio/mod.ts";
import { FiveFiltersEntry } from "types/types.ts";
import { Html5Entities } from "html_entities/mod.js";

// ! This is only intended to be used with RSS feeds generated by https://fivefilters.org/
export const parseFiveFiltersRSSfeed = async (
	feedUrl: string
): Promise<Array<FiveFiltersEntry>> => {
	const res = await fetch(feedUrl);
	const xml = await res.text();
	const $ = cheerio.load(xml);

	const entries: Array<FiveFiltersEntry> = [];

	for (const ent of $("item").toArray()) {
		if ($("body").text().includes("FiveFilters")) {
			continue;
		}

		const { content, thumbnailUrl } = cleanFiveFiltersHTML(
			$(ent).children("description").first().html() || ""
		);

		const entry: FiveFiltersEntry = {
			title: Html5Entities.decode($(ent).children("title").first().text()),
			url: $(ent).children("dc\\:identifier").first().text(),
			content: content,
			thumbnailUrl: thumbnailUrl,
		};

		if (!thumbnailUrl) {
			delete entry.thumbnailUrl;
		}

		entries.push(entry);
	}

	return entries;
};

const cleanFiveFiltersHTML = (html: string) => {
	const $content = cheerio.load(Html5Entities.decode(html));
	$content(".sr-date").parent().remove();
	$content('a[href="https://blockads.fivefilters.org"]').parent().remove();
	$content('a[href="https://blockads.fivefilters.org/acceptable.html"]')
		.parent()
		.remove();
	$content(
		'img[src="https://data.gossiplankanews.com/box0/arti.png"]'
	).remove();
	$content(".adsbygoogle").remove();
	$content("*").removeAttr("style");

	return {
		content: Html5Entities.decode($content.html()),
		thumbnailUrl: $content("img").attr("src"),
	};
};
