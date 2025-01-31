import type { FastifyRequest, FastifyReply } from "fastify";
import { getEmployeesByName } from "../services/get-employees-by-name";

export class GetEmployeesByName {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name } = request.query as { name: string };

		const employees = await getEmployeesByName(name);

		if (employees === "Name not found on database") {
			return reply.code(404).send({ employees });
		}

		return reply.code(200).send(employees);
	}
}
