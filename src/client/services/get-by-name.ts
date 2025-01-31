import type { IClient } from "../@types/client";
import { database } from "@/database/config";
import { Client } from "../models/Client";

type TGetClientByName = { message: string; clients?: IClient[] };

export async function getClientsByName(
	name: string,
): Promise<TGetClientByName> {
	const clients = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.leftJoinAndSelect("client.address", "address")
		.where("LOWER(client.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (clients.length > 0) {
		return { message: "Usuários encontrados com sucesso", clients };
	}

	return {
		message: "Nome do usuário não encontrado no nosso banco de dados",
	};
}
