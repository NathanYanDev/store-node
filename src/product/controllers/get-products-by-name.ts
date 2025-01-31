import type { FastifyRequest, FastifyReply } from "fastify";
import { getProductByName } from "../services/get-products-by-name";

export class GetProductsByName {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name } = request.query as { name: string };

		const products = await getProductByName(name);

		if (products === "Product not found on database") {
			return reply.code(404).send({ products });
		}

		return reply.code(200).send(products);
	}
}
