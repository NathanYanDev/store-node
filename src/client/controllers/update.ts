import type { RouteOptions } from "fastify";
import { type TUpdateClientParams, updateClient } from "../services/update";
import type { IClientWithoutID } from "../@types/client";
import { hash } from "@/lib/bcrypt";
import { isAuthenticated } from "@/shared/isAuthenticated";

export const UpdateClient: RouteOptions = {
	method: "PUT",
	url: "/update/:id",
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "integer" },
			},
			required: ["id"],
		},
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				cpf: { type: "string", pattern: "^\\d{11}$" },
				email: { type: "string", format: "email" },
				password: { type: "string", minLength: 3 },
				phone: { type: "string", minLength: 10, maxLength: 11 },
				birth_date: { type: "string", format: "date" },
				gender: { type: "string", enum: ["Masculino", "Feminino"] },
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
							enum: ["Residencial", "Comercial", "Outros"],
						},
						street: { type: "string" },
						number: { type: "string" },
						neighborhood: { type: "string" },
						city: { type: "string" },
						state: { type: "string", minLength: 2, maxLength: 3 },
						zip_code: {
							type: "string",
							minLength: 8,
							maxLength: 8,
						},
						country: { type: "string" },
					},
				},
			},
		},
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			400: {
				type: "object",
				properties: {
					error: { type: "string" },
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
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };
		const {
			name,
			cpf,
			email,
			password,
			phone,
			birth_date,
			gender,
			status,
			type,
			address,
		} = request.body as IClientWithoutID;

		const newHashPass = await hash(password);

		if (!newHashPass) {
			return reply
				.code(404)
				.send({ error: "Senha inválida, tente novamente" });
		}

		if (id === undefined) {
			return reply
				.code(400)
				.send({ error: "O ID do cliente é obrigatório" });
		}

		const client: TUpdateClientParams = {
			id,
			name,
			cpf,
			email,
			password: newHashPass as string,
			phone,
			birth_date,
			gender,
			status,
			type,
			address,
		};

		const updateResult = await updateClient(client);

		if (updateResult) {
			reply
				.code(200)
				.send({ message: "Informações atualizadas com sucesso" });
		}
		return reply
			.code(404)
			.send({ error: "Houve um erro, tente novamente" });
	},
};
