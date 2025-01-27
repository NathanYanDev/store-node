import type { IClient } from "../@types/client";
import { database } from "@/database/config";
import { Client } from "../models/Client";

type TGetClientByName = IClient[] | string;

export async function getClientsByName(
	name: string,
): Promise<TGetClientByName> {
	const clients = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.where("LOWER(client.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (clients.length > 0) {
		return clients;
	}

	return "Name not found on database";
}
