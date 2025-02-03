import { Client } from "@/client/models/Client";
import { Product } from "@/product/models/Product";
import { Seller } from "@/seller/models/Seller";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("rating")
export class Rating {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Seller,
		(seller) => seller.ratings,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "seller_id",
		foreignKeyConstraintName: "seller_id",
		referencedColumnName: "id",
	})
	seller: Seller;

	@ManyToOne(
		() => Client,
		(client) => client.ratings,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "client_id",
		foreignKeyConstraintName: "client_id",
		referencedColumnName: "id",
	})
	client: Client;

	@ManyToOne(
		() => Product,
		(product) => product.ratings,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "product_id",
		foreignKeyConstraintName: "product_id",
		referencedColumnName: "id",
	})
	product: Product;

	@Column({ type: "float" })
	rating: number;

	@Column({ type: "varchar", length: 255 })
	comment: string;

	@Column({ type: "date" })
	review_date: Date;
}
