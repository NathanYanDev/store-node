import type { RouteOptions } from "fastify";
import { getClient } from "../services/get-by-id";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { clientInfoR } from "../schemas/client";

export const GetClient: RouteOptions = {
	method: "GET",
	url: "/:id",
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "integer" },
			},
			required: ["id"],
		},
		response: {
			200: {
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
			404: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };

		const { message, client } = await getClient(id);

		if (message === "Usuário não encontrado no banco de dados") {
			return reply.code(404).send({ error: message });
		}

		return reply.code(200).send(client);
	},
};
