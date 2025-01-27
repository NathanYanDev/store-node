import type { FastifyRequest, FastifyReply } from "fastify";
import { getProductsByPriceRange } from "../services/get-products-by-price-range";

export class GetProductsByPriceRange {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { min, max } = request.query as { min: number; max: number };

		const products = await getProductsByPriceRange(min, max);

		if (products === "Don't exist products in this range") {
			reply.code(404).send({ products });
		}

		reply.code(200).send(products);
	}
}
