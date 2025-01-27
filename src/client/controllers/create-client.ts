import type { FastifyRequest, FastifyReply } from "fastify";
import { createClient } from "../services/create-client";
import type { IClientWithoutID } from "../@types/client";

export class CreateClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
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
		const client: IClientWithoutID = {
			name,
			cpf,
			email,
			phone,
			birth_date: new Date(birth_date),
			gender,
			createdAt: new Date(),
			status,
			type,
			address,
			sales: [],
		};

		const message = await createClient(client);

		if (message === "Client created successfully") {
			reply.code(201).send({ message });
		}

		reply.code(404).send({ message });
	}
}
