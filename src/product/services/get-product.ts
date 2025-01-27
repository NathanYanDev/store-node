import type { IProduct } from "../@types/product";
import { database } from "@/database/config";
import { Product } from "../models/Product";

type GetProductReturn = IProduct | string;

export async function getProduct(id: number): Promise<GetProductReturn> {
	const product = await database
		.getRepository(Product)
		.createQueryBuilder("product")
		.where(`product.id = ${id}`)
		.getOne();

	if (product) {
		return product;
	}

	return "Product not found on database";
}
