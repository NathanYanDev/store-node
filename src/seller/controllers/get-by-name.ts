import type { RouteOptions } from "fastify";
import { getSellersByName } from "../services/get-by-name";
import { sellerInfoR } from "../schemas/seller";

export const GetSellersByName: RouteOptions = {
	method: "GET",
	url: "/search",
	schema: {
		querystring: {
			type: "object",
			properties: {
				name: { type: "string" },
			},
		},
		response: {
			200: {
				type: "array",
				items: {
					sellerInfoR,
				},
			},
			404: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const { name } = request.query as { name: string };

		const { message, sellers } = await getSellersByName(name);

		if (!sellers) {
			return reply.code(404).send({ error: message });
		}

		return reply.code(200).send({ sellers });
	},
};
