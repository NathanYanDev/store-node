import { Product } from "../models/Product";
import { database } from "@/database/config";

export type TUpdateProductParams = {
	id: number;
	name: string;
	description: string;
	price: number;
};

export async function updateProduct(product: TUpdateProductParams) {
	try {
		const newProduct = await database
			.createQueryBuilder()
			.update(Product)
			.set({
				name: product.name,
				description: product.description,
				price: product.price,
			})
			.where(`id = ${product.id}`)
			.execute();

		return newProduct;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
