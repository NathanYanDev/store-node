import type { RouteOptions } from "fastify";
import { getClients } from "../services/get-all";
import { isAuthenticated } from "@/shared/isAuthenticated";

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
						address: {
							type: "object",
							properties: {
								type: {
									type: "string",
									enum: [
										"Residencial",
										"Comercial",
										"Outros",
									],
								},
								street: { type: "string" },
								number: { type: "string" },
								neighborhood: { type: "string" },
								city: { type: "string" },
								state: {
									type: "string",
									minLength: 2,
									maxLength: 3,
								},
								zip_code: {
									type: "string",
									minLength: 8,
									maxLength: 8,
								},
								country: { type: "string" },
							},
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
	preHandler: isAuthenticated,
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
