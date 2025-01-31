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
	MALE = "Masculino",
	FEMALE = "Feminino",
}

export enum ClientStatus {
	ACTIVE = "Ativo",
	INACTIVE = "Inativo",
	BLOCKED = "Bloqueado",
}

export enum ClientType {
	NATURAL_PERSON = "Pessoa fisica",
	LEGAL_PERSON = "Pessoa juridica",
}

@Entity("client")
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "char", length: 12, unique: true, nullable: false })
	cpf: string;

	@Column({ type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ type: "varchar", length: 255, nullable: false })
	password: string;

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
