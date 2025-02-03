import { Address } from "@/models/Address";
import type { ISellerWithoutID } from "../@types/seller";
import { Seller } from "../models/Seller";
import { database } from "@/database/config";

type signUpReturn = {
	message: string;
	createdId?: number;
};

export async function signUp(seller: ISellerWithoutID): Promise<signUpReturn> {
	try {
		await database
			.createQueryBuilder()
			.insert()
			.into(Address)
			.values(seller.address)
			.execute();

		const sl = await database
			.createQueryBuilder()
			.insert()
			.into(Seller)
			.values(seller)
			.execute();

		return {
			message: "Seller created successfully",
			createdId: sl.raw.insertId,
		};
	} catch (error) {
		console.log(error);
		return { message: "Houve um erro, tente novamente" };
	}
}
