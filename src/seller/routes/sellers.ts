import type { FastifyInstance } from "fastify";
import { GetSeller } from "../controllers/get-by-id";
import { GetSellers } from "../controllers/get-all";
import { SignUpSeller } from "../controllers/sign-up";
import { UpdateSeller } from "../controllers/update";
import { DeleteSeller } from "../controllers/delete";
import { GetSellersByName } from "../controllers/get-by-name";
import { SignInSeller } from "../controllers/sign-in";

const routes = [
	GetSellers,
	GetSeller,
	GetSellersByName,
	SignUpSeller,
	SignInSeller,
	UpdateSeller,
	DeleteSeller,
];

export async function SellerRoutes(fastify: FastifyInstance) {
	routes.map((route) => {
		fastify.route(route);
	});
}
