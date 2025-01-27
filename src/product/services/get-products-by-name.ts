import type { IProduct } from "../@types/product";
import { Product } from "../models/Product";
import { database } from "@/database/config";

export type TGetProductByName = IProduct[] | string;

export async function getProductByName(
	name: string,
): Promise<TGetProductByName> {
	const products = await database
		.getRepository(Product)
		.createQueryBuilder("product")
		.where("LOWER(product.name) LIKE :name", {
			name: `%${name.toLocaleLowerCase()}%`,
		})
		.getMany();

	if (products.length > 0) {
		return products;
	}

	return "Product not found on database";
}
