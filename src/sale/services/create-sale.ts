import { Sale } from "../models/sale";
import { database } from "@/database/config";
import type { IClient } from "@/client/@types/client";
import type { ISeller } from "@/seller/@types/seller";
import type { Product } from "@/product/models/Product";

export async function createSale(
	product: Product[],
	client: IClient,
	seller: ISeller,
	totalAmount: number,
) {
	try {
		const sale = new Sale();
		sale.client = client;
		sale.date_of_sale = new Date();
		sale.seller = seller;
		sale.products = product;
		sale.total_amount = totalAmount;

		await database.manager.save(sale);

		return "Sale registered successfully";
	} catch (err) {
		if (err instanceof Error) return err.message;
	}
}
