import type { IEmployee } from "../@types/employee";
import { database } from "@/database/config";
import { Employee } from "../models/Employee";

type TGetEmployeeByName = IEmployee[] | string;

export async function getEmployeesByName(
	name: string,
): Promise<TGetEmployeeByName> {
	const employees = await database
		.getRepository(Employee)
		.createQueryBuilder("employee")
		.where("LOWER(employee.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (employees.length > 0) {
		return employees;
	}

	return "Name not found on database";
}
