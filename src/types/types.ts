export type Language = "si" | "en" | "ta"; //ISO 639-1

export interface Source {
	name: string;
	language: Language;
	url: string;
	provider: string;
	enabled: boolean;
}

export interface Post {
	title: string;
	content?: string;
	url: string;
	thumbnailUrl?: string;
	language: Language;
	sourceName: string;
	createdLkDate: string;
	createdDate: Date;
}

export interface FiveFiltersEntry {
	title: string;
	url: string;
	content: string;
	thumbnailUrl?: string;
}

export interface DbPost extends Post {
	_id: { $oid: string };
}

export interface Provider {
	scrape: (source: Source) => Array<Post>;
}

export interface WsClient {
	socket: WebSocket;
	data: {
		keyword: string;
		sources: Array<string>;
		languages: Array<Language>;
	};
}
