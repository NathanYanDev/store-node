import type { RouteOptions } from "fastify";
import { signIn } from "../services/sign-in";
import { sign, type Payload } from "@/lib/jwt";

export const SignInClient: RouteOptions = {
	method: "POST",
	url: "/signin",
	schema: {
		body: {
			type: "object",
			properties: {
				email: { type: "string", format: "email" },
				password: { type: "string", minLength: 3 },
			},
		},
		response: {
			200: {
				type: "object",
				properties: {
					acessToken: { type: "string" },
				},
			},
			401: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
			500: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
	handler: async (request, reply) => {
		const { email, password } = request.body as {
			email: string;
			password: string;
		};

		const { client, message } = await signIn(email, password);

		if (
			message ===
			"Credenciais inválidas, verifique o email ou a senha e tente novamente"
		) {
			return reply.code(401).send({ error: message });
		}

		if (!client) {
			return reply
				.code(500)
				.send({ error: "Houve um erro, tente novamente" });
		}

		const payload: Payload = {
			id: client.id,
			cpf: client.cpf,
			email: client.email,
		};

		const token = await sign(payload);

		return reply.code(200).send({ acessToken: token });
	},
};
