import { database } from "@/database/config";
import { Seller } from "../models/Seller";
import type { ContractType, SellerStatus } from "../models/Seller";
import type { Address } from "@/models/Address";

export type TUpdateSellerParams = {
	id: number;
	name: string;
	cpf: string;
	email: string;
	birth_date: Date;
	date_of_admission: Date;
	position: string;
	salary: number;
	status: SellerStatus;
	contract: ContractType;
};

export async function updateSeller(seller: TUpdateSellerParams) {
	const userID = seller.id;

	try {
		const newSeller = await database
			.createQueryBuilder()
			.update(Seller)
			.set({
				name: seller.name,
				cpf: seller.cpf,
				email: seller.email,
				birth_date: seller.birth_date,
				date_of_admission: seller.date_of_admission,
				position: seller.position,
				salary: seller.salary,
				status: seller.status,
				contract: seller.contract,
			})
			.where(`id = ${userID}`)
			.execute();

		return newSeller;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
