import type { Sale } from "@/sale/models/sale";
import type { ContractType, EmployeeStatus } from "../models/Employee";
import type { Address } from "@/models/Address";

export interface IEmployeeWithoutID {
	name: string;
	cpf: string;
	email: string;
	password: string;
	birth_date: Date;
	date_of_admission: Date;
	position: string;
	salary: number;
	status: EmployeeStatus;
	contract: ContractType;
	address: Address;
	sales: Sale[];
}

export interface IEmployee extends IEmployeeWithoutID {
	id: number;
}
