import type { RouteOptions } from "fastify";
import { type TUpdateSellerParams, updateSeller } from "../services/update";
import type { ISeller } from "../@types/seller";
import { isAuthenticated } from "@/shared/isAuthenticated";
import { sellerInfoCU } from "../schemas/seller";
import { hash } from "@/lib/bcrypt";

export const UpdateSeller: RouteOptions = {
	method: "PUT",
	url: "/update/:id",
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "integer" },
			},
		},
		body: {
			type: "object",
			properties: sellerInfoCU,
		},
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			400: {
				type: "object",
				properties: {
					error: { type: "string" },
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
	preHandler: isAuthenticated,
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };
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
		} = request.body as ISeller;

		if (id === undefined) {
			return reply.code(400).send({ error: "Seller ID is required" });
		}

		const newHashPass = await hash(password);

		if (!newHashPass) {
			return reply
				.code(404)
				.send({ error: "Senha inválida, tente novamente" });
		}

		const seller: TUpdateSellerParams = {
			id,
			name,
			email,
			password: newHashPass as string,
			phone,
			cpf_cnpj,
			address,
			type,
			delivery_time,
			delivery_type,
		};

		const updateResult = await updateSeller(seller);

		if (updateResult) {
			reply
				.code(200)
				.send({ message: "Informações atualizadas com sucesso" });
		}
		return reply
			.code(404)
			.send({ error: "Houve um erro, tente novamente" });
	},
};
