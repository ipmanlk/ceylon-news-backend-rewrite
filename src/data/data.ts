import { MongoClient } from "mongodb/mod.ts";
import { ObjectId } from "mongodb/bson/mod.ts";
import { DbPost, Language, Post } from "types/types.ts";

const client = new MongoClient();

export const initializeDB = async () => {
	try {
		await connectToDb();
		const database = client.database("cn");
		const news = database.collection<DbPost>("news");

		const result = await news.createIndexes({
			indexes: [{ key: { url: 1 }, name: "urlIndex", unique: true }],
		});

		console.log(`Database initialized: ${JSON.stringify(result)}`);
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
};

export const savePosts = async (posts: Array<Post>): Promise<Array<DbPost>> => {
	try {
		await connectToDb();
		const database = client.database("cn");
		const news = database.collection<DbPost>("news");

		// find existing ones
		const dbPosts = await news
			.find(
				{ url: { $in: posts.map((p) => p.url) } },
				{ projection: { url: 1 } }
			)
			.toArray();

		const dbPostUrls = dbPosts.map((p) => p.url);

		// find new posts
		const newPosts = posts.filter((p) => !dbPostUrls.includes(p.url));

		if (newPosts.length > 0) {
			const insertResult = await news.insertMany(newPosts, { ordered: false });
			console.log(`Inserted: ${JSON.stringify(insertResult.insertedCount)}`);

			const newDbPosts = await news
				.find({
					_id: { $in: insertResult.insertedIds },
				})
				.toArray();
			return newDbPosts;
		} else {
			console.log("No new posts.");
		}
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
	return [];
};

export const searchPosts = async (
	keyword: string,
	sources: Array<string> = [],
	languages: Array<Language>,
	skip: number,
	limit: number
) => {
	try {
		await connectToDb();
		const database = client.database("cn");
		const news = database.collection<DbPost>("news");

		// find existing ones
		const dbPosts = await news
			.find(
				{
					sourceName: { $in: sources },
					language: { $in: languages },
					$or: [
						{ title: new RegExp(`.*${keyword}.*`) },
						{ content: new RegExp(`.*${keyword}.*`) },
						{ createdLkDate: new RegExp(`.*${keyword}.*`) },
					],
				},
				{ projection: { content: 0 }, skip: skip, limit: limit }
			)
			.sort({ date: -1 })
			.toArray();

		if (dbPosts.length > 0) {
			return dbPosts;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
	return [];
};

export const getPost = async (id: string): Promise<DbPost | undefined> => {
	try {
		await connectToDb();
		const database = client.database("cn");
		const news = database.collection<DbPost>("news");

		// find existing ones
		const dbPost = await news.findOne({ _id: new ObjectId(id) });

		return dbPost;
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
};

const connectToDb = async () => {
	const mongoURI = Deno.env.get("MONGO_URI") || "";
	await client.connect(mongoURI);
};
