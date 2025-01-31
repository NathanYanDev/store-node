import type { RouteOptions } from "fastify";
import { getClient } from "../services/get-by-id";

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
			404: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };

		const { message, client } = await getClient(id);

		if (message === "Usuário não encontrado no banco de dados") {
			return reply.code(404).send({ message });
		}

		return reply.code(200).send(client);
	},
};
