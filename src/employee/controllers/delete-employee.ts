import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteEmployee } from "../services/delete-employee";

export class DeleteEmployee {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const message = await deleteEmployee(id);

		if (message === "Employee deleted successfully")
			reply.code(200).send({ message });

		reply.code(404).send({ message });
	}
}
