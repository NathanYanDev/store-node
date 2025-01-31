import { database } from "@/database/config";
import { Client } from "../models/Client";
import type { ClientType, Gender, ClientStatus } from "../models/Client";
import type { Address } from "@/models/Address";

export type TUpdateClientParams = {
	id: number;
	name: string;
	cpf: string;
	email: string;
	password: string;
	phone: string;
	birth_date: Date;
	gender: Gender;
	status: ClientStatus;
	type: ClientType;
	address: Address;
};

export async function updateClient(client: TUpdateClientParams) {
	const userID = client.id;

	try {
		const newClient = await database
			.createQueryBuilder()
			.update(Client)
			.set({
				name: client.name,
				cpf: client.cpf,
				email: client.email,
				password: client.password,
				phone: client.phone,
				birth_date: client.birth_date,
				gender: client.gender,
				status: client.status,
				type: client.type,
				address: client.address,
			})
			.where(`id = ${userID}`)
			.execute();

		return newClient;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
