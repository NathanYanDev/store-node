import type { IEmployee } from "../@types/employee";
import { database } from "@/database/config";
import { Employee } from "../models/Employee";

type GetEmployeeReturn = IEmployee | string;

export async function getEmployee(id: number): Promise<GetEmployeeReturn> {
	const employee = await database
		.getRepository(Employee)
		.createQueryBuilder("employee")
		.where(`employee.id = ${id}`)
		.getOne();

	if (employee) {
		return employee;
	}

	return "User not found on database";
}
