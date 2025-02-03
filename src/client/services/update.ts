import { database } from "@/database/config";
import { Client } from "../models/Client";
import type { ClientType, Gender, ClientStatus } from "../models/Client";
import { Address } from "@/models/Address";
import { getClient } from "./get-by-id";

export type TUpdateClientParams = {
	id: number;
	name: string;
	cpf: string;
	email: string;
	password: string;
	phone: string;
	birth_date: Date;
	updatedAt: Date;
	gender: Gender;
	status: ClientStatus;
	type: ClientType;
	address: Address;
};

export async function updateClient(client: TUpdateClientParams) {
	const clientID = client.id;
	const address = client.address;

	const { client: clientInfo } = await getClient(clientID);
	const addressID = clientInfo?.address.id;

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
				updatedAt: client.updatedAt,
				gender: client.gender,
				status: client.status,
				type: client.type,
			})
			.where(`id = ${clientID}`)
			.execute();

		const newAddress = await database
			.createQueryBuilder()
			.update(Address)
			.set({
				type: address.type,
				street: address.street,
				number: address.number,
				neighborhood: address.neighborhood,
				city: address.city,
				state: address.state,
				zip_code: address.zip_code,
				country: address.country,
			})
			.where(`id = ${addressID}`)
			.execute();

		if (newClient && newAddress) {
			return true;
		}
		return false;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
