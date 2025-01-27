import type { FastifyRequest, FastifyReply } from "fastify";
import { getPosition } from "../services/get-employees-by-position";

export class GetEmployeesByPosition {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { position } = request.params as { position: string };

		const employees = await getPosition(position);

		if (employees === "Position not found on database") {
			reply.code(404).send({ employees });
		}

		reply.code(200).send(employees);
	}
}
