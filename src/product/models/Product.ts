import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	type Relation,
	OneToMany,
} from "typeorm";
import { Sale } from "@/sale/models/sale";
import { Rating } from "@/models/Rating";

@Entity("product")
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50, type: "varchar" })
	name: string;

	@Column({ type: "varchar", length: 255 })
	description: string;

	@Column("double")
	price: number;

	@Column("int")
	stock: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	image_path: string;

	@ManyToMany(
		() => Sale,
		(sale) => sale.products,
	)
	sales: Relation<Sale[]>;

	@OneToMany(
		() => Rating,
		(rating) => rating.product,
	)
	ratings: Rating[];
}
