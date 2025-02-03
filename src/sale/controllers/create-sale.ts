import type { FastifyRequest, FastifyReply } from "fastify";
import type { Product } from "@/product/models/Product";
import type { IClient } from "@/client/@types/client";
import type { IProductSale } from "@/product/@types/product";
import type { ISeller } from "@/seller/@types/seller";

import { createSale } from "../services/create-sale";
import { getClient } from "@/client/services/get-by-id";
import { getSeller } from "@/seller/services/get-by-id";
import { getProduct } from "@/product/services/get-product";
import { updateProductStockQuantity } from "@/product/services/update-product-stock-quantity";

export type TSale = {
	client_id: number;
	seller_id: number;
	products: IProductSale[];
};

export class CreateSale {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { client_id, seller_id, products } = request.body as TSale;

		const client = (await getClient(client_id)) as IClient;
		const seller = (await getSeller(seller_id)) as ISeller;

		const productsData = [];
		let total_amount = 0;

		const productPromises = products.map(async (product) => {
			const productData = (await getProduct(product.id)) as Product;
			if (productData.stock > product.quantity) {
				const newQty = productData.stock - product.quantity;
				await updateProductStockQuantity(product.id, newQty);
			}
			total_amount += product.quantity * productData.price;
			return productData;
		});

		const resolvedProducts = await Promise.all(productPromises);

		productsData.push(...resolvedProducts);

		const message = await createSale(
			productsData,
			client,
			seller,
			total_amount,
		);

		if (message === "Sale registered successfully")
			return reply.code(200).send({ message });
		return reply.code(200).send({ message: "An error occurred" });
	}
}
