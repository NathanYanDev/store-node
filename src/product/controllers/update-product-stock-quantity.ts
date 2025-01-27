import type { FastifyRequest, FastifyReply } from "fastify";
import { updateProductStockQuantity } from "../services/update-product-stock-quantity";

export class UpdateProductStockQuantity {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const { qty } = request.query as { qty: number };

		const message = await updateProductStockQuantity(id, qty);

		if (message === "Updated stock") {
			reply.code(200).send({ message });
		}

		reply.code(404).send({ message: "An error occurred" });
	}
}
