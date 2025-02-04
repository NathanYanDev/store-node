import { Address } from "@/models/Address";
import type { IClientWithoutID } from "../@types/client";
import { Client } from "../models/Client";
import { database } from "@/database/config";

type createClientReturn = {
	message: string;
	createdId?: number;
};

export async function createClient(
	client: IClientWithoutID,
): Promise<createClientReturn> {
	try {
		await database
			.createQueryBuilder()
			.insert()
			.into(Address)
			.values(client.address)
			.execute();

		const clientCreated = await database
			.createQueryBuilder()
			.insert()
			.into(Client)
			.values(client)
			.execute();

		return {
			message: "Usuário criado com sucesso",
			createdId: clientCreated.raw.insertId,
		};
	} catch (error) {
		console.log(error);
		return { message: "Houve um problema, tente novamente" };
	}
}
