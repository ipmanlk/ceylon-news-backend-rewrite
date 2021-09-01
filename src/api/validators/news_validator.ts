// TODO: Refactor these validators

import { Context } from "oak/mod.ts";
import { getQuery } from "oak/helpers.ts";
import { Language } from "types/types.ts";
import { sources } from "sources/sources.ts";

// Vd =  Validated
interface VdResult {
	status: boolean;
	error?: string;
}

interface vdPostsDataResult extends VdResult {
	data?: {
		keyword: string;
		sources: Array<string>;
		languages: Array<Language>;
		skip: number;
		limit: number;
	};
}

interface vdPostDataResult extends VdResult {
	data?: {
		_id: string;
	};
}

interface vdWsUpdatesDataResult extends VdResult {
	data?: {
		keyword: string;
		sources: Array<string>;
		languages: Array<Language>;
	};
}

export const validateGetPosts = (ctx: Context): vdPostsDataResult => {
	const query = getQuery(ctx, { mergeParams: true });

	if (!query.sources) {
		return { status: false, error: "Please provide a valid list of sources." };
	}

	if (!query.languages) {
		return {
			status: false,
			error: "Please provide a valid list of languages.",
		};
	}

	const inputLanguages: Array<string> = query.languages
		.split(",")
		.map((i) => i.toLowerCase().trim());

	let hasInvalidLanguage = false;

	inputLanguages.every((lang) => {
		if (!["si", "en", "ta"].includes(lang)) {
			hasInvalidLanguage = true;
			return false;
		}
		return true;
	});

	if (hasInvalidLanguage) {
		return {
			status: false,
			error: "Your request contains an invalid language.",
		};
	}

	const inputSources = query.sources
		.split(",")
		.map((i) => i.toLowerCase().trim());

	let hasInvalidSource = false;
	let invalidSourceName = "";

	inputSources.every((sname) => {
		const result = sources.find((s) => s.name.toLowerCase() == sname);

		if (!result) {
			hasInvalidSource = true;
			invalidSourceName = sname;
			return false;
		}
		return true;
	});

	if (hasInvalidSource) {
		return {
			status: false,
			error: `Your request contains an invalid source ${invalidSourceName}.`,
		};
	}

	let skip = 0;
	let limit = 10;

	if (query.limit) {
		const inputLimit = parseInt(query.limit);

		if (isNaN(inputLimit)) {
			return {
				status: false,
				error: `Please provide a valid number for the limit.`,
			};
		}

		if (inputLimit <= 15) limit = inputLimit;
	}

	if (query.skip) {
		const inputSkip = parseInt(query.skip);

		if (isNaN(inputSkip)) {
			return {
				status: false,
				error: `Please provide a valid number for the skip.`,
			};
		}

		skip = inputSkip;
	}

	return {
		status: true,
		data: {
			keyword: query.keyword || "",
			sources: inputSources,
			languages: inputLanguages as Array<Language>,
			limit: limit,
			skip: skip,
		},
	};
};

export const validateGetPost = (ctx: Context): vdPostDataResult => {
	const query = getQuery(ctx, { mergeParams: true });

	if (!query._id) {
		return { status: false, error: "Please provide a valid news id." };
	}

	return { status: true, data: { _id: query._id } };
};

export const validateWsUpdatesRequest = (
	ctx: Context
): vdWsUpdatesDataResult => {
	const query = getQuery(ctx, { mergeParams: true });

	if (!query.languages) {
		return {
			status: false,
			error: "Please provide a valid list of languages.",
		};
	}

	const inputLanguages: Array<string> = query.languages
		.split(",")
		.map((i) => i.toLowerCase().trim());

	let hasInvalidLanguage = false;

	inputLanguages.every((lang) => {
		if (!["si", "en", "ta"].includes(lang)) {
			hasInvalidLanguage = true;
			return false;
		}
		return true;
	});

	if (hasInvalidLanguage) {
		return {
			status: false,
			error: "Your request contains an invalid language.",
		};
	}

	const inputSources = query.sources
		.split(",")
		.map((i) => i.toLowerCase().trim());

	let hasInvalidSource = false;
	let invalidSourceName = "";

	inputSources.every((sname) => {
		const result = sources.find((s) => s.name.toLowerCase() == sname);

		if (!result) {
			hasInvalidSource = true;
			invalidSourceName = sname;
			return false;
		}
		return true;
	});

	if (hasInvalidSource) {
		return {
			status: false,
			error: `Your request contains an invalid source ${invalidSourceName}.`,
		};
	}

	return {
		status: true,
		data: {
			keyword: query.keyword || "",
			sources: inputSources,
			languages: inputLanguages as Array<Language>,
		},
	};
};
