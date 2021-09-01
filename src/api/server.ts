import { Application, Router } from "oak/mod.ts";
import {
	getPosts,
	getPost,
	registerWsClient,
} from "./handlers/news_handler.ts";

const app = new Application();
const router = new Router();

router.get("/api/news", getPosts);
router.get("/api/news/:_id", getPost);
router.get("/api/updates_ws", registerWsClient);

app.use(router.routes());

export const startAPI = async () => {
	console.log("API is running.");
	await app.listen({ port: 3000 });
};
