import type { FastifyRequest, FastifyReply } from "fastify";
import {
	type TUpdateClientParams,
	updateClient,
} from "../services/update-client";
import type { IClientWithoutID } from "../@types/client";

export class UpdateClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const {
			name,
			cpf,
			email,
			phone,
			birth_date,
			gender,
			status,
			type,
			address,
		} = request.body as IClientWithoutID;

		if (id === undefined) {
			reply.code(400).send({ error: "Client ID is required" });
			return;
		}

		const client: TUpdateClientParams = {
			id,
			name,
			cpf,
			email,
			phone,
			birth_date,
			gender,
			status,
			type,
			address,
		};

		const newClient = await updateClient(client);

		reply.code(200).send({ newClient });
	}
}
