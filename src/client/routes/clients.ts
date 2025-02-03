import type { FastifyInstance } from "fastify";
import { GetClient } from "../controllers/get-by-id";
import { GetClients } from "../controllers/get-all";
import { SignUpClient } from "../controllers/sign-up";
import { UpdateClient } from "../controllers/update";
import { DeleteClient } from "../controllers/delete";
import { GetClientsByName } from "../controllers/get-by-name";
import { SignInClient } from "../controllers/sign-in";

const routes = [
	GetClients,
	GetClient,
	GetClientsByName,
	SignUpClient,
	SignInClient,
	UpdateClient,
	DeleteClient,
];

export async function ClientRoutes(fastify: FastifyInstance) {
	routes.map((route) => {
		fastify.route(route);
	});
}
