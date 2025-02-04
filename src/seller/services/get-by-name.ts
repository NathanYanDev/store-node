import type { ISeller } from "../@types/seller";
import { database } from "@/database/config";
import { Seller } from "../models/Seller";

type GetSellerByNameReturn = {
	message: string;
	sellers?: ISeller[];
};

export async function getSellersByName(
	name: string,
): Promise<GetSellerByNameReturn> {
	const sellers = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.where("LOWER(seller.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (sellers.length > 0) {
		return {
			message: "Nome do vendedor encontrado no banco de dados",
			sellers,
		};
	}

	return { message: "Nome do vendedor não encontrado no banco de dados" };
}
