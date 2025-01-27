import type { IProduct } from "../@types/product";
import { Product } from "../models/Product";
import { database } from "@/database/config";

export async function getProducts(): Promise<IProduct[]> {
	const products = await database
		.getRepository(Product)
		.createQueryBuilder("product")
		.getMany();

	return products;
}
