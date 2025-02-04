import type { RouteOptions } from "fastify";
import { signUp } from "../services/sign-up";
import type { ISellerWithoutID } from "../@types/seller";
import { sellerInfoCU } from "../schemas/seller";
import { SellerStatus } from "../models/Seller";
import { sign } from "@/lib/jwt";
import { verifyEmailAndCpf } from "@/shared/verify-email-and-cpf";
import { hash } from "@/lib/bcrypt";

export const SignUpSeller: RouteOptions = {
	method: "POST",
	url: "/signup",
	schema: {
		body: {
			type: "object",
			properties: sellerInfoCU,
		},
		response: {
			201: {
				type: "object",
				properties: {
					message: { type: "string" },
					acessToken: { type: "string" },
				},
			},
			404: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const {
			name,
			email,
			password,
			phone,
			cpf_cnpj,
			address,
			type,
			delivery_time,
			delivery_type,
		} = request.body as ISellerWithoutID;

		const hashPass = await hash(password);

		if (!hashPass) {
			return reply
				.code(404)
				.send({ error: "Senha inválida, tente novamente" });
		}

		const userCreatedMessage = await verifyEmailAndCpf(
			email,
			cpf_cnpj,
			"seller",
		);

		if (userCreatedMessage !== "Usuário pode ser criado") {
			return reply.code(404).send({ error: userCreatedMessage });
		}

		const seller: ISellerWithoutID = {
			name,
			email,
			password: hashPass,
			phone,
			cpf_cnpj,
			address,
			type,
			status: SellerStatus.ACTIVE,
			delivery_time,
			delivery_type,
			created_at: new Date(),
			updated_at: new Date(),
			avg_rating: 0,
			count_ratings: 0,
			sales: [],
			ratings: [],
		};

		const { message, createdId } = await signUp(seller);

		if (createdId) {
			const acessToken = await sign({
				id: createdId,
				cpf: cpf_cnpj,
				email,
			});
			if (acessToken) {
				return reply.code(201).send({ message, acessToken });
			}
			return reply.code(404).send({
				error: "Houve um erro para gerar o token, tente realizar o login com a conta cadastrada",
			});
		}
		return reply.code(404).send({ error: message });
	},
};
