import { fastify, type FastifyInstance } from "fastify";
import { ClientRoutes } from "./client/routes/clients";
import { EmployeeRoutes } from "./employee/routes/employees";
import { ProductRoutes } from "./product/routes/products";
import { SalesRoutes } from "./sale/routes/sales";

import multipart from "@fastify/multipart";
import AWS from "aws-sdk";

const FILE_SIZE = 10 * 1024 * 1024;

export class Application {
	private app: FastifyInstance;
	private port = 3333;
	public s3;

	constructor() {
		this.app = fastify();
		this.routes();
		this.s3 = new AWS.S3({ region: "sa-east-1" });
	}

	private routes() {
		this.app
			.register(multipart, { limits: { fileSize: FILE_SIZE } })
			.register(ClientRoutes, { prefix: "/clients" })
			.register(EmployeeRoutes, { prefix: "/employees" })
			.register(ProductRoutes, { prefix: "/products" })
			.register(SalesRoutes, { prefix: "/sales" });
	}

	public listen() {
		this.app.listen({ port: this.port }, (err, address) => {
			if (err) {
				console.log(err);
				process.exit(1);
			}

			console.log(`Server listening on ${address}`);
		});
	}
}
