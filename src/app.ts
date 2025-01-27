import { fastify, type FastifyInstance } from "fastify";
import { ClientRoutes } from "./client/routes/clients";
import { EmployeeRoutes } from "./employee/routes/employees";
import { ProductRoutes } from "./product/routes/products";
import { SalesRoutes } from "./sale/routes/sales";

export class Application {
	private app: FastifyInstance;
	private port = 3333;

	constructor() {
		this.app = fastify();
		this.routes();
	}

	private routes() {
		this.app
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
