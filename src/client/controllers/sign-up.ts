import type { RouteOptions } from "fastify";
import { createClient } from "../services/create";
import type { IClientWithoutID } from "../@types/client";
import { hash } from "@/lib/bcrypt";
import { verifyEmailAndCpf } from "../../shared/verify-email-and-cpf";
import { sign } from "@/lib/jwt";
import { clientInfoCU } from "../schemas/client";

export const SignUpClient: RouteOptions = {
	method: "POST",
	url: "/signup",
	schema: {
		body: {
			type: "object",
			properties: clientInfoCU,
		},
		response: {
			201: {
				type: "object",
				properties: {
					acessToken: { type: "string" },
					message: { type: "string" },
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
			cpf,
			email,
			password,
			phone,
			birth_date,
			gender,
			status,
			type,
			address,
		} = request.body as IClientWithoutID;

		const hashPass = await hash(password);

		if (!hashPass) {
			return reply
				.code(404)
				.send({ error: "Senha inválida, tente novamente" });
		}

		const userCreatedMessage = await verifyEmailAndCpf(
			email,
			cpf,
			"client",
		);

		if (userCreatedMessage !== "Usuário pode ser criado") {
			return reply.code(404).send({ error: userCreatedMessage });
		}

		const client: IClientWithoutID = {
			name,
			cpf,
			email,
			password: hashPass as string,
			phone,
			birth_date: new Date(birth_date),
			gender,
			createdAt: new Date(),
			updatedAt: new Date(),
			status,
			type,
			address,
			sales: [],
		};

		const { message, createdId } = await createClient(client);
		if (createdId) {
			const acessToken = await sign({ id: createdId, email, cpf });
			return reply.code(201).send({ acessToken, message });
		}

		return reply.code(404).send({ error: message });
	},
};
