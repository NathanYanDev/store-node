import type { Employee } from "@/employee/models/Employee";
import type { Client } from "@/client/models/Client";

export interface ISale {
	id: number;
	date_of_sale: Date;
	total_amount: number;
	employee_id: Employee;
	client_id: Client;
}
