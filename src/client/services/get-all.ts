import type { IClient } from "../@types/client";
import { database } from "@/database/config";
import { Client } from "../models/Client";

export async function getClients(): Promise<IClient[]> {
	const clientRepository = database.getRepository(Client);
	const clients = await clientRepository.find({
		relations: {
			address: true,
			sales: true,
		},
	});

	return clients;
}
