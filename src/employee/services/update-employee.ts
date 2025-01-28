import { database } from "@/database/config";
import { Employee } from "../models/Employee";
import type { ContractType, EmployeeStatus } from "../models/Employee";
import type { Address } from "@/models/Address";

export type TUpdateEmployeeParams = {
	id: number;
	name: string;
	cpf: string;
	email: string;
	birth_date: Date;
	date_of_admission: Date;
	position: string;
	salary: number;
	status: EmployeeStatus;
	contract: ContractType;
};

export async function updateEmployee(employee: TUpdateEmployeeParams) {
	const userID = employee.id;

	try {
		const newEmployee = await database
			.createQueryBuilder()
			.update(Employee)
			.set({
				name: employee.name,
				cpf: employee.cpf,
				email: employee.email,
				birth_date: employee.birth_date,
				date_of_admission: employee.date_of_admission,
				position: employee.position,
				salary: employee.salary,
				status: employee.status,
				contract: employee.contract,
			})
			.where(`id = ${userID}`)
			.execute();

		return newEmployee;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
