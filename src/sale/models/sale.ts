import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Client } from "@/client/models/Client";
import { Seller } from "@/seller/models/Seller";
import { Product } from "@/product/models/Product";

@Entity("sale")
export class Sale {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "date" })
	date_of_sale: Date;

	@Column("double")
	total_amount: number;

	@ManyToOne(
		() => Seller,
		(seller) => seller.sales,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "seller_id",
		foreignKeyConstraintName: "seller_id_fk",
		referencedColumnName: "id",
	})
	seller: Seller;

	@ManyToOne(
		() => Client,
		(client) => client.sales,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "client_id",
		foreignKeyConstraintName: "client_id_fk",
		referencedColumnName: "id",
	})
	client: Client;

	@ManyToMany(
		() => Product,
		(product) => product.sales,
		{ nullable: false },
	)
	@JoinTable()
	products: Product[];
}
