import type { FastifyRequest, FastifyReply } from "fastify";
import {
	type TUpdateEmployeeParams,
	updateEmployee,
} from "../services/update-employee";
import type { IEmployee } from "../@types/employee";

export class UpdateEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const {
			name,
			cpf,
			email,
			birth_date,
			date_of_admission,
			position,
			salary,
			status,
			contract,
		} = request.body as IEmployee;

		if (id === undefined) {
			reply.code(400).send({ error: "Employee ID is required" });
			return;
		}

		const employee: TUpdateEmployeeParams = {
			id,
			name,
			cpf,
			email,
			birth_date: new Date(birth_date),
			date_of_admission: new Date(date_of_admission),
			position,
			salary,
			status,
			contract,
		};

		const newEmployee = await updateEmployee(employee);

		reply.code(200).send({ newEmployee });
	}
}
