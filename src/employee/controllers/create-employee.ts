import type { FastifyRequest, FastifyReply } from "fastify";
import { createEmployee } from "../services/create-employee";
import type { IEmployeeWithoutID } from "../@types/employee";

export class CreateEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
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
			address,
		} = request.body as IEmployeeWithoutID;
		const employee: IEmployeeWithoutID = {
			name,
			cpf,
			email,
			birth_date: new Date(birth_date),
			date_of_admission: new Date(date_of_admission),
			position,
			salary,
			status,
			contract,
			address,
			sales: [],
		};

		const message = await createEmployee(employee);

		return reply.code(201).send({ message });
	}
}
