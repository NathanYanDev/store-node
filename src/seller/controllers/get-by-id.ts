import type { RouteOptions } from "fastify";
import { getSeller } from "../services/get-by-id";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { sellerInfoR } from "../schemas/seller";

export const GetSeller: RouteOptions = {
	method: "GET",
	url: "/:id",
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "integer" },
			},
		},
		response: {
			200: {
				sellerInfoR,
			},
			400: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };

		const { message, seller } = await getSeller(id);

		if (!seller) {
			return reply.code(404).send({ error: message });
		}

		return reply.code(200).send(seller);
	},
};
