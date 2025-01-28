import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum AddressType {
	HOME = "Residencial",
	BUSINESS = "Comercial",
	OTHERS = "Outros",
}

@Entity("address")
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "enum", enum: AddressType, default: AddressType.HOME })
	type: AddressType;

	@Column({ type: "varchar", length: 255, nullable: false })
	street: string;

	@Column({ type: "varchar", length: 20 })
	number: string;

	@Column({ type: "varchar", length: 100 })
	neighborhood: string;

	@Column({ type: "varchar", length: 100 })
	city: string;

	@Column({ type: "varchar", length: 2 })
	state: string;

	@Column({ type: "varchar", length: 10 })
	zip_code: string;

	@Column({ type: "varchar", length: 100, default: "Brasil" })
	country: string;
}
