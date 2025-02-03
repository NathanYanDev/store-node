import type { FastifyRequest, FastifyReply } from "fastify";
import { getSellersByName } from "../services/get-by-name";

export class GetSellersByName {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name } = request.query as { name: string };

		const sellers = await getSellersByName(name);

		if (sellers === "Seller name not found on database") {
			return reply.code(404).send({ sellers });
		}

		return reply.code(200).send(sellers);
	}
}
