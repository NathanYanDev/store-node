import type { ISeller } from "../@types/seller";
import { database } from "@/database/config";
import { Seller } from "../models/Seller";

type GetSellerReturn = ISeller | string;

export async function getSeller(id: number): Promise<GetSellerReturn> {
	const seller = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.where(`seller.id = ${id}`)
		.getOne();

	if (seller) {
		return seller;
	}

	return "User not found on database";
}
