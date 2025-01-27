import { Sale } from "../models/sale";
import { database } from "@/database/config";
import type { IClient } from "@/client/@types/client";
import type { IEmployee } from "@/employee/@types/employee";
import type { Product } from "@/product/models/Product";

export async function createSale(
	product: Product[],
	client: IClient,
	employee: IEmployee,
	totalAmount: number,
) {
	try {
		const sale = new Sale();
		sale.client = client;
		sale.date_of_sale = new Date();
		sale.employee = employee;
		sale.products = product;
		sale.total_amount = totalAmount;

		await database.manager.save(sale);

		return "Sale registered successfully";
	} catch (err) {
		if (err instanceof Error) return err.message;
	}
}
