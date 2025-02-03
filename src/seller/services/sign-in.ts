import { database } from "@/database/config";
import { Seller } from "../models/Seller";
import { verify } from "@/lib/bcrypt";
import type { ISeller } from "../@types/seller";

type signInReturn = {
	message: string;
	seller?: ISeller;
};

export async function signIn(
	email: string,
	password: string,
): Promise<signInReturn> {
	const seller = await database
		.getRepository(Seller)
		.createQueryBuilder("seller")
		.where("seller.email = :email", { email })
		.getOne();

	if (seller) {
		const verifyPass = await verify(seller.password, password);

		if (verifyPass) {
			return { message: "Usuário autenticado com sucesso", seller };
		}
	}

	return {
		message:
			"Credenciais inválidas, verifique o email ou a senha e tente novamente",
	};
}
