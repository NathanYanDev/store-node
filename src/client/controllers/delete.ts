import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteClient } from "../services/delete";

export class DeleteClient {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const message = await deleteClient(id);

		if (message === "Usuário deletado com sucesso") {
			return reply.code(200).send({ message });
		}
		return reply
			.code(404)
			.send({ error: "Houve um problema, tente novamente" });
	}
}
