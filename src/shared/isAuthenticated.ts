import { verify } from "@/lib/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function isAuthenticated(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const rawToken = request.headers.authorization;
	const tokenParts = rawToken?.split("Bearer ");
	const acessToken = tokenParts?.[1];

	if (acessToken) {
		const payload = await verify(acessToken);

		if (payload) {
			return payload;
		}
	}
	return reply.code(401).send({ error: "Invalid token" });
}
