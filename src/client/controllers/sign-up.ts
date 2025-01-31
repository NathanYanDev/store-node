import type { RouteOptions } from "fastify";
import { createClient } from "../services/create";
import type { IClientWithoutID } from "../@types/client";
import { hash } from "@/lib/bcrypt";
import { verifyEmailAndCpf } from "../services/verify-email-and-cpf";

export const SignUpClient: RouteOptions = {
	method: "POST",
	url: "/signup",
	schema: {
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				cpf: { type: "string", pattern: "^\\d{11}$" },
				email: { type: "string", format: "email" },
				password: { type: "string", minLength: 3 },
				phone: { type: "string", minLength: 10, maxLength: 11 },
				birth_date: { type: "string", format: "date" },
				gender: { type: "string", enum: ["Masculino", "Feminino"] },
				status: {
					type: "string",
					enum: ["Ativo", "Inativo", "Bloqueado"],
				},
				type: {
					type: "string",
					enum: ["Pessoa fisica", "Pessoa juridica"],
				},
				address: {
					type: "object",
					properties: {
						type: {
							type: "string",
							enum: ["Residencial", "Comercial", "Outros"],
						},
						street: { type: "string" },
						number: { type: "string" },
						neighborhood: { type: "string" },
						city: { type: "string" },
						state: { type: "string", minLength: 2, maxLength: 3 },
						zip_code: {
							type: "string",
							minLength: 8,
							maxLength: 8,
						},
						country: { type: "string" },
					},
				},
			},
		},
		response: {
			201: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			404: {
				type: "object",
				properties: {
					errorMessage: { type: "string" },
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
				.send({ errorMessage: "Senha inválida, tente novamente" });
		}

		const userCreatedMessage = await verifyEmailAndCpf(email, cpf);

		if (userCreatedMessage !== "Usuário pode ser criado") {
			return reply.code(404).send({ userCreatedMessage });
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
			status,
			type,
			address,
			sales: [],
		};

		const message = await createClient(client);

		if (message === "Usuário criado com sucesso") {
			return reply.code(201).send({ message });
		}

		return reply.code(404).send({ errorMessage: message });
	},
};
