import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteClient } from "../services/delete-client";

export class DeleteClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const message = await deleteClient(id);

		reply.code(200).send({ message });
	}
}
