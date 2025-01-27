import type { FastifyRequest, FastifyReply } from "fastify";
import { getProducts } from "../services/get-products";

export class GetProducts {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const products = await getProducts();

		if (products.length > 0) {
			reply.code(200).send({ products });
		}

		reply.code(404).send({ message: "Não existem produtos cadastrados" });
	}
}
