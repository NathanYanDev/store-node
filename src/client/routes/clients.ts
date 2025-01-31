import type { FastifyInstance } from "fastify";
import { GetClient } from "../controllers/get-by-id";
import { GetClients } from "../controllers/get-all";
import { SignUpClient } from "../controllers/sign-up";
import { UpdateClient } from "../controllers/update";
import { DeleteClient } from "../controllers/delete";
import { GetClientsByName } from "../controllers/get-by-name";
import { SignInClient } from "../controllers/sign-in";

export async function ClientRoutes(fastify: FastifyInstance) {
	fastify
		.route(GetClients)
		.route(GetClient)
		.route(GetClientsByName)
		.route(SignUpClient)
		.route(SignInClient)
		.put("/update/:id", new UpdateClient().handle)
		.delete("/delete/:id", new DeleteClient().handle);
}
