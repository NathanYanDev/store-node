import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteProduct } from "../services/delete-product";

export class DeleteProduct {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const message = await deleteProduct(id);

		if (message === "Product deleted successfully") {
			return reply.code(200).send({ message });
		}
		return reply.code(404).send({ message });
	}
}
