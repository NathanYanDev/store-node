import type { FastifyInstance } from "fastify";
import { GetEmployee } from "../controllers/get-employee";
import { GetEmployees } from "../controllers/get-employees";
import { CreateEmployee } from "../controllers/create-employee";
import { UpdateEmployee } from "../controllers/update-employee";
import { DeleteEmployee } from "../controllers/delete-employee";
import { GetEmployeesByPosition } from "../controllers/get-employees-by-position";
import { GetEmployeesByName } from "../controllers/get-employees-by-name";

export async function EmployeeRoutes(fastify: FastifyInstance) {
	fastify
		.get("/", new GetEmployees().handle)
		.get("/:id", new GetEmployee().handle)
		.get("/position/:position", new GetEmployeesByPosition().handle)
		.get("/search", new GetEmployeesByName().handle)
		.post("/create", new CreateEmployee().handle)
		.put("/update/:id", new UpdateEmployee().handle)
		.delete("/delete/:id", new DeleteEmployee().handle);
}
