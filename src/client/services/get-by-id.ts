import { database } from "@/database/config";
import { Client } from "../models/Client";
import type { IClient } from "../@types/client";

type GetClientReturn = { message: string; client?: IClient };

export async function getClient(id: number): Promise<GetClientReturn> {
	const client = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.leftJoinAndSelect("client.address", "address")
		.where(`client.id = ${id}`)
		.getOne();

	if (client) {
		return { message: "Usuário encontrado", client };
	}

	return { message: "Usuário não encontrado no banco de dados" };
}
