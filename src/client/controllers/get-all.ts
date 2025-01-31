import type { RouteOptions } from "fastify";
import { getClients } from "../services/get-all";

// TODO: TERMINAR ESSA E AS DEMAIS ROTAS
export const GetClients: RouteOptions = {
	method: "GET",
	url: "/",
	schema: {
		response: {
			200: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "integer" },
						name: { type: "string" },
						cpf: { type: "string", pattern: "^\\d{11}$" },
						email: { type: "string", format: "email" },
						phone: { type: "string", minLength: 10, maxLength: 11 },
						birth_date: { type: "string", format: "date" },
						gender: {
							type: "string",
							enum: ["Masculino", "Feminino"],
						},
						status: {
							type: "string",
							enum: ["Ativo", "Inativo", "Bloqueado"],
						},
						type: {
							type: "string",
							enum: ["Pessoa fisica", "Pessoa juridica"],
						},
					},
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
					],
				},
			},
			404: {
				type: "object",
				properties: {
					message: { type: "string" },
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
			.send({ message: "Não existem clientes cadastrados" });
	},
};
