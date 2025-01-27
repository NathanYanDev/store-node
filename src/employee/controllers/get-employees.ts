import type { FastifyRequest, FastifyReply } from "fastify";
import { getEmployees } from "../services/get-employees";

export class GetEmployees {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const employees = await getEmployees();

		reply.code(200).send(employees);
	}
}
