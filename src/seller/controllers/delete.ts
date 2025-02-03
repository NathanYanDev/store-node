import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteSeller } from "../services/delete";

export class DeleteSeller {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const message = await deleteSeller(id);

		if (message === "Seller deleted successfully")
			return reply.code(200).send({ message });

		return reply.code(404).send({ message });
	}
}
