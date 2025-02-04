import { Seller } from "../models/Seller";
import { database } from "@/database/config";

export async function deleteSeller(id: number) {
	try {
		const result = await database
			.createQueryBuilder()
			.delete()
			.from(Seller)
			.where(`id = ${id}`)
			.execute();

		if (result.affected === 0) {
			return "ID do vendedor não encontrado";
		}

		return "Informações do vendedor deletadas com sucesso";
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
