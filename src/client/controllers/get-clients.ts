import type { FastifyRequest, FastifyReply } from "fastify";
import { getClients } from "../services/get-clients";

export class GetClients {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const clients = await getClients();

		if (clients.length > 0) {
			reply.code(200).send(clients);
		}

		reply.code(404).send({ message: "Não existem clientes cadastrados" });
	}
}
