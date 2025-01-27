import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Client } from "@/client/models/Client";
import { Employee } from "@/employee/models/Employee";
import { Product } from "@/product/models/Product";
import { Sale } from "@/sale/models/sale";
import { Address } from "@/models/Address";

dotenv.config();

export const database = new DataSource({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT
		? Number.parseInt(process.env.DATABASE_PORT, 10)
		: undefined,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	entities: [Client, Employee, Product, Sale, Address],
	synchronize: true,
	logging: false,
});
