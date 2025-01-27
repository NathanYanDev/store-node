import type { IProduct } from "../@types/product";
import { Product } from "../models/Product";
import { database } from "@/database/config";

export async function createProduct(product: IProduct) {
	try {
		await database
			.createQueryBuilder()
			.insert()
			.into(Product)
			.values(product)
			.execute();
		return "Product created successfully";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
