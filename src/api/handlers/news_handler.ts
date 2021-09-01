import { Context } from "oak/mod.ts";
import * as newsValidator from "validators/news_validator.ts";
import * as db from "data/data.ts";
import { storeWsClient, isWsClientsFull } from "mailman/mailman.ts";

export const getPosts = async (ctx: Context) => {
	const result = newsValidator.validateGetPosts(ctx);

	if (!result.status || !result.data) {
		ctx.response.status = 400;
		ctx.response.body = { error: result.error };
		return;
	}

	const { keyword, languages, sources, skip, limit } = result.data;

	try {
		const posts = await db.searchPosts(
			keyword,
			sources,
			languages,
			skip,
			limit
		);
		ctx.response.body = posts;
	} catch (e) {
		console.log(e);
		ctx.response.status = 500;
		ctx.response.body = { error: "Something went wrong." };
	}
};

export const getPost = async (ctx: Context) => {
	const result = newsValidator.validateGetPost(ctx);

	if (!result.status || !result.data) {
		ctx.response.status = 400;
		ctx.response.body = { error: result.error };
		return;
	}

	try {
		const post = await db.getPost(result.data._id);

		if (post) {
			ctx.response.body = post;
		} else {
			ctx.response.status = 404;
			ctx.response.body = {
				error: "Unable to find a news article with the given id.",
			};
		}
	} catch (e) {
		console.log(e);
		ctx.response.status = 500;
		ctx.response.body = { error: "Something went wrong." };
	}
};

export const registerWsClient = async (ctx: Context) => {
	const result = await newsValidator.validateWsUpdatesRequest(ctx);

	if (!result.status || !result.data) {
		return false;
	}

	if (isWsClientsFull()) return false;

	try {
		const socket = await ctx.upgrade();
		storeWsClient({ socket: socket, data: result.data });
	} catch {
		return false;
	}
};
