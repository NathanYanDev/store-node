import type { RouteOptions } from "fastify";
import { getClientsByName } from "../services/get-by-name";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { clientInfoR } from "../schemas/client";

export const GetClientsByName: RouteOptions = {
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
					type: "object",
					properties: clientInfoR,
					required: [
						"id",
						"name",
						"cpf",
						"email",
						"phone",
						"birth_date",
						"gender",
						"status",
						"type",
						"address",
					],
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

		const { message, clients } = await getClientsByName(name);

		if (!clients) {
			return reply.code(404).send({ error: message });
		}

		return reply.code(200).send(clients);
	},
};
