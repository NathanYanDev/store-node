import type { FastifyInstance } from "fastify";
import { GetSeller } from "../controllers/get-by-id";
import { GetSellers } from "../controllers/get-all";
import { SignUpSeller } from "../controllers/sign-up";
import { UpdateSeller } from "../controllers/update";
import { DeleteSeller } from "../controllers/delete";
import { GetSellersByName } from "../controllers/get-by-name";
import { SignInSeller } from "../controllers/sign-in";

export async function SellerRoutes(fastify: FastifyInstance) {
	fastify
		.route(GetSellers)
		.route(SignUpSeller)
		.route(SignInSeller)
		.get("/:id", new GetSeller().handle)
		.get("/search", new GetSellersByName().handle)
		.put("/update/:id", new UpdateSeller().handle)
		.delete("/delete/:id", new DeleteSeller().handle);
}
