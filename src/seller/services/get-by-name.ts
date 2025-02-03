import type { ISeller } from "../@types/seller";
import { database } from "@/database/config";
import { Seller } from "../models/Seller";

type TGetSellerByName = ISeller[] | string;

export async function getSellersByName(
	name: string,
): Promise<TGetSellerByName> {
	const sellers = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.where("LOWER(seller.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (sellers.length > 0) {
		return sellers;
	}

	return "Seller name not found on database";
}
