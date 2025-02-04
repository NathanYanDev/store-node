import type { RouteOptions } from "fastify";
import { type TUpdateClientParams, updateClient } from "../services/update";
import type { IClientWithoutID } from "../@types/client";
import { hash } from "@/lib/bcrypt";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { clientInfoCU } from "../schemas/client";

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
			properties: clientInfoCU,
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
			updatedAt: new Date(),
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
