import type { FastifyRequest, FastifyReply } from "fastify";
import {
	type TUpdateEmployeeParams,
	updateEmployee,
} from "../services/update-employee";
import type { IEmployee } from "../@types/employee";

export class UpdateEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const { name, position, salary } = request.body as IEmployee;

		if (id === undefined) {
			reply.code(400).send({ error: "Employee ID is required" });
			return;
		}

		const employee: TUpdateEmployeeParams = {
			id,
			name,
			position,
			salary,
		};

		const newEmployee = await updateEmployee(employee);

		reply.code(200).send({ newEmployee });
	}
}
