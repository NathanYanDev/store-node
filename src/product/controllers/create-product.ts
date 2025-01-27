import type { FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "../services/create-product";
import type { IProduct } from "../@types/product";

export class CreateProduct {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name, description, price, stock } = request.body as IProduct;

		const newProduct = { name, description, price, stock, sales: [] };

		const message = await createProduct(newProduct);

		if (message === "Product created successfully") {
			reply.code(201).send({ message });
		}
		reply.code(404).send({ message });
	}
}
