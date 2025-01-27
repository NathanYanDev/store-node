import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "@/client/models/Client";
import { Employee } from "@/employee/models/Employee";
import { Product } from "@/product/models/Product";
import { Sale } from "@/sale/models/sale";
import { Address } from "@/models/Address";

export const database = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: process.env.DATABASE_PASSWORD,
	database: "store",
	entities: [Client, Employee, Product, Sale, Address],
	synchronize: true,
	logging: false,
});
