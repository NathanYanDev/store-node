import { database } from "@/database/config";
import { Client } from "../models/Client";
import type { IClient } from "../@types/client";

type GetClientReturn = IClient | string;

export async function getClient(id: number): Promise<GetClientReturn> {
	const client = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.where(`client.id = ${id}`)
		.getOne();

	if (client) {
		return client;
	}

	return "User not found on database";
}
