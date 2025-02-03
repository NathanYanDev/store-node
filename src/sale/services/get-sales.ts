import { Sale } from "../models/sale";
import { database } from "@/database/config";

export async function getSales(): Promise<Sale[]> {
	const saleRepository = database.getRepository(Sale);
	const sales = await saleRepository.find({
		relations: {
			products: true,
			seller: true,
			client: true,
		},
	});

	return sales;
}
