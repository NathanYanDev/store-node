import type { FastifyRequest, FastifyReply } from "fastify";
import { getSale } from "../services/get-sale";

export class GetSale {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };

		const sale = await getSale(id);

		if (sale) reply.code(200).send(sale);
		reply.code(404).send({ message: "Sale not found on database" });
	}
}
