import type { Sale } from "@/sale/models/sale";
import type { ClientType, Gender, ClientStatus } from "../models/Client";
import type { Address } from "@/models/Address";

export interface IClientWithoutID {
	name: string;
	cpf: string;
	email: string;
	password: string;
	phone: string;
	birth_date: Date;
	gender: Gender;
	createdAt: Date;
	updatedAt?: Date;
	status: ClientStatus;
	type: ClientType;
	address: Address;
	sales: Sale[];
}

export interface IClient extends IClientWithoutID {
	id: number;
}
