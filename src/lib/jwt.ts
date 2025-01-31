import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.JWT_SECRET as string;

export type Payload = {
	id: number;
	cpf: string;
	email: string;
};

export async function sign(payload: Payload) {
	try {
		return jwt.sign(payload, secret_key);
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function verify(token: string) {
	return jwt.verify(token, secret_key);
}
