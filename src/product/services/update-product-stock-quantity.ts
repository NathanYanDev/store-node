import { Product } from "../models/Product";
import { database } from "@/database/config";

export async function updateProductStockQuantity(id: number, qty: number) {
	try {
		await database
			.createQueryBuilder()
			.update(Product)
			.set({ stock: qty })
			.where("id = :id", { id })
			.execute();

		return "Updated stock";
	} catch (err) {
		if (err instanceof Error) return err.message;
	}
}
