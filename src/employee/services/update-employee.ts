import { database } from "@/database/config";
import { Employee } from "../models/Employee";

export type TUpdateEmployeeParams = {
	id: number;
	name: string;
	position: string;
	salary: number;
};

export async function updateEmployee(employee: TUpdateEmployeeParams) {
	const userID = employee.id;

	try {
		const newEmployee = await database
			.createQueryBuilder()
			.update(Employee)
			.set({
				name: employee.name,
				position: employee.position,
				salary: employee.salary,
			})
			.where(`id = ${userID}`)
			.execute();

		return newEmployee;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
