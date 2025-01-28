import { Address } from "@/models/Address";
import type { IEmployeeWithoutID } from "../@types/employee";
import { Employee } from "../models/Employee";
import { database } from "@/database/config";

export async function createEmployee(employee: IEmployeeWithoutID) {
	try {
		await database
			.createQueryBuilder()
			.insert()
			.into(Address)
			.values(employee.address)
			.execute();

		await database
			.createQueryBuilder()
			.insert()
			.into(Employee)
			.values(employee)
			.execute();

		return "Employee created successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
