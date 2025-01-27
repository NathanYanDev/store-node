import type { FastifyInstance } from "fastify";
import { GetSales } from "../controllers/get-sales";
import { CreateSale } from "../controllers/create-sale";
import { GetSale } from "../controllers/get-sale";

export async function SalesRoutes(fastify: FastifyInstance) {
	fastify
		.get("/", new GetSales().handle)
		.get("/:id", new GetSale().handle)
		.post("/create", new CreateSale().handle);
}
