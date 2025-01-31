import { database } from "@/database/config";
import { Client } from "../models/Client";
import { verify } from "@/lib/bcrypt";

export async function signIn(email: string, password: string) {
	const client = await database
		.getRepository(Client)
		.createQueryBuilder("client")
		.where("client.email = :email", { email })
		.getOne();

	if (client) {
		const verifyPass = await verify(client.password, password);

		if (verifyPass) {
			return { message: "Usuário autenticado com sucesso", client };
		}
	}

	return {
		message:
			"Credenciais inválidas, verifique o email ou a senha e tente novamente",
	};
}
