import type { FastifyRequest, FastifyReply } from "fastify";
import { createEmployee } from "../services/create-employee";
import type { IEmployeeWithoutID } from "../@types/employee";

export class CreateEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name, position, salary } = request.body as IEmployeeWithoutID;
		const employee: IEmployeeWithoutID = {
			name,
			position,
			salary,
			sales: [],
		};

		const message = await createEmployee(employee);

		reply.code(201).send({ message });
	}
}
