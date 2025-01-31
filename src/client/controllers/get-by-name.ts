import type { RouteOptions } from "fastify";
import { getClientsByName } from "../services/get-by-name";

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
	handler: async (request, reply) => {
		const { name } = request.query as { name: string };

		const { message, clients } = await getClientsByName(name);

		if (
			message === "Nome do usuário não encontrado no nosso banco de dados"
		) {
			return reply.code(404).send({ message });
		}

		return reply.code(200).send(clients);
	},
};
