import type { IClient } from "../@types/client";
import { database } from "@/database/config";
import { Client } from "../models/Client";

export async function getClients(): Promise<IClient[]> {
	const clients = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.getMany();

	return clients;
}
