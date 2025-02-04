import type { Sale } from "@/sale/models/sale";
import type { DeliveryType, SellerStatus, SellerType } from "../models/Seller";
import type { Address } from "@/models/Address";
import type { Rating } from "@/models/Rating";

export interface ISellerWithoutID {
	name: string;
	email: string;
	password: string;
	phone: string;
	cpf_cnpj: string;
	address: Address;
	type: SellerType;
	created_at: Date;
	updated_at: Date;
	status: SellerStatus;
	avg_rating: number;
	count_ratings: number;
	delivery_time: number;
	delivery_type: DeliveryType;
	ratings: Rating[];
	sales: Sale[];
}

export interface ISeller extends ISellerWithoutID {
	id: number;
}
