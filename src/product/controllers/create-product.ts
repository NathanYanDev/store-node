import type { FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "../services/create-product";
import type { IProduct } from "../@types/product";
import { Application } from "@/app";
export class CreateProduct {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		// TODO: MULTIPART REQUEST
		const s3 = new Application().s3;
		const newProduct: IProduct = {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			image_path: "",
			sales: [],
		};
		try {
			const parts = request.parts();

			for await (const part of parts) {
				if (part.type === "field") {
					if (part.fieldname === "name") {
						newProduct.name = part.value as string;
					} else if (part.fieldname === "description") {
						newProduct.description = part.value as string;
					} else if (part.fieldname === "price") {
						newProduct.price = Number.parseFloat(
							part.value as string,
						);
					} else if (part.fieldname === "stock") {
						newProduct.stock = Number.parseInt(
							part.value as string,
						);
					}
				} else if (part.type === "file") {
					const fileName = `products/${Date.now()}_${part?.filename}`;

					const uploadParams = {
						Bucket: "fastybuybucket",
						Key: fileName,
						Body: part.file,
						ACL: "public-read",
						ContentType: part.mimetype,
					};

					try {
						const s3Response = await s3
							.upload(uploadParams)
							.promise();
						const imageURL = s3Response.Location;

						newProduct.image_path = imageURL;
					} catch (err) {
						console.log(err);
						return reply
							.code(404)
							.send({ error: "Insert a valid image" });
					}
				}
			}

			const message = await createProduct(newProduct);

			if (message === "Product created successfully") {
				return reply.code(201).send({ message });
			}
			return reply.code(404).send({ message });
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: "Error processing form" });
		}
	}
}
