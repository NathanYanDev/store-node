import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	type Relation,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Sale } from "@/sale/models/sale";
import { Address } from "@/models/Address";

export enum Gender {
	MALE = "male",
	FEMALE = "female",
}

export enum ClientStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	BLOCKED = "blocked",
}

export enum ClientType {
	NATURAL_PERSON = "PF",
	LEGAL_PERSON = "PJ",
}

@Entity("client")
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "varchar", length: 14, unique: true, nullable: false })
	cpf: string;

	@Column({ type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ type: "varchar", length: 15 })
	phone: string;

	@Column({ type: "date" })
	birth_date: Date;

	@Column({ type: "enum", enum: Gender })
	gender: Gender;

	@Column({ type: "date" })
	createdAt: Date;

	@Column({ type: "enum", enum: ClientStatus, default: ClientStatus.ACTIVE })
	status: ClientStatus;

	@Column({
		type: "enum",
		enum: ClientType,
		default: ClientType.LEGAL_PERSON,
	})
	type: ClientType;

	@OneToOne(() => Address, { nullable: false })
	@JoinColumn()
	address: Address;

	@OneToMany(
		() => Sale,
		(sale) => sale.client,
	)
	sales: Relation<Sale[]>;
}
