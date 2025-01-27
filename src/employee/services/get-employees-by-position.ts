import type { IEmployee } from "../@types/employee";
import { database } from "@/database/config";
import { Employee } from "../models/Employee";

type GetPositionReturn = IEmployee[] | string;

export async function getPosition(
	position: string,
): Promise<GetPositionReturn> {
	const employees = await database
		.getRepository(Employee)
		.createQueryBuilder("employee")
		.where("LOWER(employee.position) LIKE :position", { position })
		.getMany();

	if (employees) {
		return employees;
	}

	return "Position not found on database";
}
