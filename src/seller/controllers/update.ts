import type { FastifyRequest, FastifyReply } from "fastify";
import { type TUpdateSellerParams, updateSeller } from "../services/update";
import type { ISeller } from "../@types/seller";

export class UpdateSeller {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: number };
		const {
			name,
			cpf,
			email,
			birth_date,
			date_of_admission,
			position,
			salary,
			status,
			contract,
		} = request.body as ISeller;

		if (id === undefined) {
			return reply.code(400).send({ error: "Seller ID is required" });
		}

		const seller: TUpdateSellerParams = {
			id,
			name,
			cpf,
			email,
			birth_date: new Date(birth_date),
			date_of_admission: new Date(date_of_admission),
			position,
			salary,
			status,
			contract,
		};

		const newSeller = await updateSeller(seller);

		return reply.code(200).send({ newSeller });
	}
}
