import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = Number.parseInt(
	process.env.BCRYPT_SALT_ROUNDS as string,
	10,
);

export async function hash(password: string) {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		return hash;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function verify(hash: string, password: string) {
	const isValidPassword = await bcrypt.compare(password, hash);

	return isValidPassword;
}
