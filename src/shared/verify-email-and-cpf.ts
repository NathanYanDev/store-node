import { database } from "@/database/config";
import { Client } from "../client/models/Client";
import { Seller } from "@/seller/models/Seller";

export async function verifyEmailAndCpf(
	email: string,
	cpf_cnpj: string,
	table_name: string,
) {
	let isCpfCnpjRegistered: boolean;
	const repository = database.getRepository(
		table_name === "client" ? Client : Seller,
	);

	const isEmailRegistered = await repository
		.createQueryBuilder()
		.select()
		.from(table_name, table_name)
		.where(`${table_name}.email = :email`, { email })
		.getExists();

	if (table_name === "client") {
		isCpfCnpjRegistered = await repository
			.createQueryBuilder()
			.select()
			.from(table_name, table_name)
			.where(`${table_name}.cpf = :cpf`, { cpf: cpf_cnpj })
			.getExists();
	} else {
		isCpfCnpjRegistered = await repository
			.createQueryBuilder()
			.select()
			.from(table_name, table_name)
			.where(`${table_name}.cpf_cnpj = :cpf_cnpj`, { cpf_cnpj })
			.getExists();
	}

	if (isEmailRegistered) {
		return "Este e-mail já está em uso. Tente outro ou recupere sua conta.";
	}
	if (isCpfCnpjRegistered) {
		return "Este CPF/CNPJ já está associado a outra conta.";
	}
	return "Usuário pode ser criado";
}
