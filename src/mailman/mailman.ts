import { DbPost, WsClient } from "types/types.ts";
import { cheerio } from "cheerio/mod.ts";

let wsClients: Array<WsClient> = [];

export const storeWsClient = (client: WsClient) => {
	client.socket.addEventListener("open", () => {
		client.socket.send(JSON.stringify({ status: true, msg: "ws connected." }));
	});

	client.socket.addEventListener("close", () => {
		removeWsClient(client);
	});

	client.socket.addEventListener("error", () => {
		removeWsClient(client);
	});

	wsClients.push(client);
};

export const isWsClientsFull = () => wsClients.length == 10;

export const sendUpdates = (newPosts: Array<DbPost>) => {
	for (const client of wsClients) {
		try {
			const filteredPosts = newPosts
				.filter((post) => {
					const keywordRegex = new RegExp(
						`.*${client.data.keyword.toLowerCase()}.*`,
						"i"
					);
					const isContentCorrect =
						keywordRegex.test(post.title) ||
						keywordRegex.test(post.content || "");

					return (
						isContentCorrect &&
						client.data.languages.includes(post.language) &&
						client.data.sources.includes(post.sourceName)
					);
				})
				.map((p) => {
					const $ = cheerio.load(p.content || "");
					let textContent = $("body").text();
					if (textContent.length > 250) {
						textContent = textContent.substr(0, 250) + "...";
					}
					if (p.title.length > 200) {
						p.title = p.title.substr(0, 200) + "...";
					}
					p.content = textContent;
					return p;
				});
			client.socket.send(JSON.stringify({ updates: filteredPosts }));
		} catch {
			continue;
		}
	}
};

const removeWsClient = (client: WsClient) => {
	wsClients = wsClients.filter((c) => c != client);
};
