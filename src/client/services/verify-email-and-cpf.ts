import { database } from "@/database/config";
import { Client } from "../models/Client";

export async function verifyEmailAndCpf(email: string, cpf: string) {
	const isEmailRegistered = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.where("client.email = :email", { email })
		.getExists();
	const isCpfRegistered = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.where("client.cpf = :cpf", { cpf })
		.getExists();

	if (isEmailRegistered) {
		return "Este e-mail já está em uso. Tente outro ou recupere sua conta.";
	}
	if (isCpfRegistered) {
		return "Este CPF já está associado a outra conta.";
	}
	return "Usuário pode ser criado";
}
