import { Client } from "../models/Client";
import { database } from "@/database/config";

export async function deleteClient(id: number) {
	try {
		await database
			.createQueryBuilder()
			.delete()
			.from(Client)
			.where(`id = ${id}`)
			.execute();

		return "Client deleted successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
