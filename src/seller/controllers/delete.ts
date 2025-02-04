import type { RouteOptions } from "fastify";
import { deleteSeller } from "../services/delete";
import { isAuthenticated } from "@/shared/isAuthenticated";

export const DeleteSeller: RouteOptions = {
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
		const message = await deleteSeller(id);

		if (message === "Informações do vendedor deletadas com sucesso")
			return reply.code(200).send({ message });

		return reply.code(404).send({ error: message });
	},
};
