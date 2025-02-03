import { Sale } from "../models/sale";
import { database } from "@/database/config";

export async function getSale(id: number) {
	const saleRepository = database.getRepository(Sale);
	const sale = saleRepository.findOne({
		where: { id },
		relations: {
			products: true,
			client: true,
			seller: true,
		},
	});

	return sale;
}
