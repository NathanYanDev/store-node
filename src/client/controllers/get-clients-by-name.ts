import type { FastifyRequest, FastifyReply } from "fastify";
import { getClientsByName } from "../services/get-clients-by-name";

export class GetClientsByName {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name } = request.query as { name: string };

		const clients = await getClientsByName(name);

		if (clients === "Name not found on database") {
			reply.code(404).send({ clients });
		}

		reply.code(200).send(clients);
	}
}
