import type { RouteOptions } from "fastify";
import { deleteClient } from "../services/delete";
import { isAuthenticated } from "@/shared/isAuthenticated";

export const DeleteClient: RouteOptions = {
	method: "DELETE",
	url: "/delete/:id",
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "integer" },
			},
		},
		response: {
			200: {
				type: "object",
				properties: {
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
	preHandler: isAuthenticated,
	handler: async (request, reply) => {
		const { id } = request.params as { id: number };
		const message = await deleteClient(id);

		if (message === "Usuário deletado com sucesso") {
			return reply.code(200).send({ message });
		}
		return reply
			.code(404)
			.send({ error: "Houve um problema, tente novamente" });
	},
};
