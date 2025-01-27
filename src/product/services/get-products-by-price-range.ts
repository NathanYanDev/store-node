import type { IProduct } from "../@types/product";
import { Product } from "../models/Product";
import { database } from "@/database/config";

export async function getProductsByPriceRange(
	min: number,
	max: number,
): Promise<IProduct[] | string> {
	const products = await database
		.getRepository(Product)
		.createQueryBuilder("product")
		.where("product.price BETWEEN :min AND :max", { min, max })
		.getMany();

	if (products.length === 0) return "Don't exist products in this range";

	return products;
}
