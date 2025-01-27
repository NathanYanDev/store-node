import type { FastifyRequest, FastifyReply } from "fastify";
import { getClient } from "../services/get-client";

export class GetClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };

		const client = await getClient(id);

		if (client === "User not found on database") {
			reply.code(404).send({ client });
		}

		reply.code(200).send(client);
	}
}
