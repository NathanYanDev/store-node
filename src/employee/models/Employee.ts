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

export enum EmployeeStatus {
	ACTIVE = "ativo",
	AWAY = "afastado",
	DISMISSED = "desligado",
}

export enum ContractType {
	CLT = "clt",
	PJ = "pj",
	Intern = "estágio",
}

@Entity("employee")
export class Employee {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 30, type: "varchar" })
	name: string;

	@Column({ type: "varchar", length: 14, unique: true, nullable: false })
	cpf: string;

	@Column({ type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ type: "date", nullable: true, default: null })
	birth_date: Date;

	@Column({ type: "date" })
	date_of_admission: Date;

	@Column({ type: "varchar", length: 30 })
	position: string;

	@Column("double")
	salary: number;

	@Column({
		type: "enum",
		enum: EmployeeStatus,
		default: EmployeeStatus.ACTIVE,
	})
	status: EmployeeStatus;

	@Column({ type: "enum", enum: ContractType, nullable: false })
	contract: ContractType;

	@OneToOne(() => Address, { nullable: false })
	@JoinColumn()
	address: Address;

	@OneToMany(
		() => Sale,
		(sale) => sale.employee,
	)
	sales: Relation<Sale[]>;
}
