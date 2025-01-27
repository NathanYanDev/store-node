import type { FastifyRequest, FastifyReply } from "fastify";
import { getProduct } from "../services/get-product";

export class GetProduct {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };

		const product = await getProduct(id);

		if (product === "Product not found on database") {
			reply.code(404).send({ product });
		}

		reply.code(200).send(product);
	}
}
