import { database } from "@/database/config";
import { Seller } from "../models/Seller";
import type { DeliveryType, SellerType } from "../models/Seller";
import { Address } from "@/models/Address";
import { getSeller } from "./get-by-id";

export type TUpdateSellerParams = {
	id: number;
	name: string;
	email: string;
	password: string;
	phone: string;
	cpf_cnpj: string;
	address: Address;
	type: SellerType;
	delivery_time: number;
	delivery_type: DeliveryType;
};

export async function updateSeller(seller: TUpdateSellerParams) {
	const userID = seller.id;
	const address = seller.address;

	const { seller: sellerInfo } = await getSeller(userID);
	const addressID = sellerInfo?.address.id;

	try {
		const newSeller = await database
			.createQueryBuilder()
			.update(Seller)
			.set({
				name: seller.name,
			})
			.where(`id = ${userID}`)
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

		if (newSeller && newAddress) {
			return true;
		}
		return false;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
