import type { Seller } from "@/seller/models/Seller";
import type { Client } from "@/client/models/Client";

export interface ISale {
	id: number;
	date_of_sale: Date;
	total_amount: number;
	seller_id: Seller;
	client_id: Client;
}
