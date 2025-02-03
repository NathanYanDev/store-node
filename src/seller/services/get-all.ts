import type { ISeller } from "../@types/seller";
import { database } from "@/database/config";
import { Seller } from "../models/Seller";

export async function getSellers(): Promise<ISeller[]> {
	const sellers = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.getMany();

	return sellers;
}
