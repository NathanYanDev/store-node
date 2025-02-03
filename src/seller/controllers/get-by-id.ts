import type { FastifyRequest, FastifyReply } from "fastify";
import { getSeller } from "../services/get-by-id";

export class GetSeller {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };

		const seller = await getSeller(id);

		if (seller === "Seller not found on database") {
			return reply.code(404).send({ seller });
		}

		return reply.code(200).send(seller);
	}
}
