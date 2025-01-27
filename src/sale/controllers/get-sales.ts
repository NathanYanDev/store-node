import type { FastifyRequest, FastifyReply } from "fastify";
import { getSales } from "../services/get-sales";

export class GetSales {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const sales = await getSales();

		if (sales.length > 0) reply.code(200).send({ sales });

		reply.code(404).send({
			message: "Não existe venda cadastrada em nosso banco de dados",
		});
	}
}
