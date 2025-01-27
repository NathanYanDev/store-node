import type { IEmployee } from "../@types/employee";
import { database } from "@/database/config";
import { Employee } from "../models/Employee";

export async function getEmployees(): Promise<IEmployee[]> {
	const employees = await database
		.getRepository(Employee)
		.createQueryBuilder("employee")
		.getMany();

	return employees;
}
