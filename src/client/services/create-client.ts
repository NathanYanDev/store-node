import { Address } from "@/models/Address";
import type { IClientWithoutID } from "../@types/client";
import { Client } from "../models/Client";
import { database } from "@/database/config";

export async function createClient(client: IClientWithoutID) {
	try {
		await database
			.createQueryBuilder()
			.insert()
			.into(Address)
			.values(client.address)
			.execute();

		await database
			.createQueryBuilder()
			.insert()
			.into(Client)
			.values(client)
			.execute();

		return "Client created successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
