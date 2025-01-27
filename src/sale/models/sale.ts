import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	JoinColumn,
} from "typeorm";
import { Client } from "@/client/models/Client";
import { Employee } from "@/employee/models/Employee";
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
		() => Employee,
		(client) => client.sales,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			cascade: true,
		},
	)
	@JoinColumn({
		name: "employee_id",
		foreignKeyConstraintName: "employee_id_fk",
		referencedColumnName: "id",
	})
	employee: Employee;

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
