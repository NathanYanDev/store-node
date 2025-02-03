import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	type Relation,
	JoinColumn,
	OneToOne,
} from "typeorm";
import { Sale } from "@/sale/models/sale";
import { Address } from "@/models/Address";
import { Rating } from "@/models/Rating";

export enum SellerStatus {
	ACTIVE = "Ativo",
	INACTIVE = "Inativo",
	BLOCKED = "Bloqueado",
}

export enum SellerType {
	PF = "Pessoa fisica",
	PJ = "Pessoa juridica",
}

export enum DeliveryType {
	OS = "Envio próprio",
	OM = "Envio marketplace",
}

@Entity("seller")
export class Seller {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 30, type: "varchar" })
	name: string;

	@Column({ type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ type: "varchar", length: 255 })
	password: string;

	@Column({ type: "varchar", length: 15 })
	phone: string;

	@Column({ type: "varchar", length: 14, unique: true })
	cpf_cnpj: string;

	@OneToOne(() => Address, { nullable: false })
	@JoinColumn()
	address: Address;

	@Column({ type: "enum", enum: SellerType })
	type: SellerType;

	@Column({ type: "date" })
	created_at: Date;

	@Column({ type: "date" })
	updated_at: Date;

	@Column({ type: "enum", enum: SellerStatus, default: SellerStatus.ACTIVE })
	status: SellerStatus;

	@Column({ type: "float" })
	avg_rating: number;

	@Column({ type: "integer" })
	count_ratings: number;

	@Column({ type: "varchar" })
	delivery_time: string;

	@Column({ type: "enum", enum: DeliveryType, default: DeliveryType.OM })
	delivery_type: DeliveryType;

	@OneToMany(
		() => Rating,
		(rating) => rating.seller,
	)
	ratings: Relation<Rating[]>;

	@OneToMany(
		() => Sale,
		(sale) => sale.seller,
	)
	sales: Relation<Sale[]>;
}
