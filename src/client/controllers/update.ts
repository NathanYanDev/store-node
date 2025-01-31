import type { FastifyRequest, FastifyReply } from "fastify";
import { type TUpdateClientParams, updateClient } from "../services/update";
import type { IClientWithoutID } from "../@types/client";
import { hash } from "@/lib/bcrypt";

export class UpdateClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
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

		const newClient = await updateClient(client);

		if (newClient) {
			reply
				.code(200)
				.send({ message: "Informações atualizadas com sucesso" });
		}
		return reply
			.code(404)
			.send({ error: "Houve um erro, tente novamente" });
	}
}
