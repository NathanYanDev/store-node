import type { FastifyRequest, FastifyReply } from "fastify";
import {
	type TUpdateProductParams,
	updateProduct,
} from "../services/update-product";
import type { IProduct } from "../@types/product";

export class UpdateProduct {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const { name, description, price } = request.body as IProduct;

		const product: TUpdateProductParams = {
			id,
			name,
			description,
			price,
		};

		const newProduct = await updateProduct(product);

		return reply.code(200).send({ newProduct });
	}
}
