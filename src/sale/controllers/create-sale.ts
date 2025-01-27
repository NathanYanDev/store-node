import type { FastifyRequest, FastifyReply } from "fastify";
import type { Product } from "@/product/models/Product";
import type { IClient } from "@/client/@types/client";
import type { IProductSale } from "@/product/@types/product";
import type { IEmployee } from "@/employee/@types/employee";

import { createSale } from "../services/create-sale";
import { getClient } from "@/client/services/get-client";
import { getEmployee } from "@/employee/services/get-employee";
import { getProduct } from "@/product/services/get-product";
import { updateProductStockQuantity } from "@/product/services/update-product-stock-quantity";

export type TSale = {
	client_id: number;
	employee_id: number;
	products: IProductSale[];
};

export class CreateSale {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { client_id, employee_id, products } = request.body as TSale;

		const client = (await getClient(client_id)) as IClient;
		const employee = (await getEmployee(employee_id)) as IEmployee;

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
			employee,
			total_amount,
		);

		if (message === "Sale registered successfully")
			reply.code(200).send({ message });
		reply.code(200).send({ message: "An error occurred" });
	}
}
