import type { FastifyInstance } from "fastify";
import { GetClient } from "../controllers/get-client";
import { GetClients } from "../controllers/get-clients";
import { CreateClient } from "../controllers/create-client";
import { UpdateClient } from "../controllers/update-client";
import { DeleteClient } from "../controllers/delete-client";
import { GetClientsByName } from "../controllers/get-clients-by-name";

export async function ClientRoutes(fastify: FastifyInstance) {
	fastify
		.get("/", new GetClients().handle)
		.get("/:id", new GetClient().handle)
		.get("/search", new GetClientsByName().handle)
		.post("/create", new CreateClient().handle)
		.put("/update/:id", new UpdateClient().handle)
		.delete("/delete/:id", new DeleteClient().handle);
}
