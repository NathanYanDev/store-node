import type { RouteOptions } from "fastify";
import { getSellers } from "../services/get-all";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { sellerInfoR } from "../schemas/seller";

export const GetSellers: RouteOptions = {
	method: "GET",
	url: "/",
	schema: {
		response: {
			200: {
				type: "array",
				items: {
					sellerInfoR,
				},
			},
			204: {
				type: "null",
			},
		},
	},
	handler: async (_, reply) => {
		const sellers = await getSellers();

		if (sellers.length > 0) {
			return reply.code(200).send(sellers);
		}
		return reply.code(204).send();
	},
};
