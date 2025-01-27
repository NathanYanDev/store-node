import type { FastifyRequest, FastifyReply } from "fastify";
import { getEmployee } from "../services/get-employee";

export class GetEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };

		const employee = await getEmployee(id);

		if (employee === "User not found on database") {
			reply.code(404).send({ employee });
		}

		reply.code(200).send(employee);
	}
}
