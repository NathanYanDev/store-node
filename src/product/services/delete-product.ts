import { database } from "@/database/config";
import { Product } from "../models/Product";

export async function deleteProduct(id: number) {
	try {
		await database
			.createQueryBuilder()
			.delete()
			.from(Product)
			.where(`id = ${id}`)
			.execute();

		return "Product deleted successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
