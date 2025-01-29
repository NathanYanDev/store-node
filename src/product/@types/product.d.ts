import type { Sale } from "@/sale/models/sale";

export interface IProduct {
	id?: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	image_path: string;
	sales: Sale[];
}

export interface IProductSale {
	id: number;
	quantity: number;
}
