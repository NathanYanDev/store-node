import type { RouteOptions } from "fastify";
import { getClients } from "../services/get-all";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { clientInfoR } from "../schemas/client";

export const GetClients: RouteOptions = {
	method: "GET",
	url: "/",
	schema: {
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
	handler: async (_, reply) => {
		const clients = await getClients();

		if (clients.length > 0) {
			return reply.code(200).send(clients);
		}

		return reply
			.code(404)
			.send({ error: "Não existem clientes cadastrados" });
	},
};
