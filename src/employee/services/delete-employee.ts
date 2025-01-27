import { Employee } from "../models/Employee";
import { database } from "@/database/config";

export async function deleteEmployee(id: number) {
	try {
		const result = await database
			.createQueryBuilder()
			.delete()
			.from(Employee)
			.where(`id = ${id}`)
			.execute();

		if (result.affected === 0) {
			return "Employee ID not found";
		}

		return "Employee deleted successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
