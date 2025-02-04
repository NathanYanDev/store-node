import type { ISeller } from "../@types/seller";
import { database } from "@/database/config";
import { Seller } from "../models/Seller";

type GetSellerReturn = { message: string; seller?: ISeller };

export async function getSeller(id: number): Promise<GetSellerReturn> {
	const seller = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.where(`seller.id = ${id}`)
		.getOne();

	if (seller) {
		return { message: "Usuário encontrado", seller };
	}

	return { message: "Usuário não encontrado no banco de dados" };
}
