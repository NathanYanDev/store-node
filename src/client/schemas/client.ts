export const clientInfoR = {
	id: { type: "integer" },
	name: { type: "string" },
	cpf: { type: "string", pattern: "^\\d{11}$" },
	email: { type: "string", format: "email" },
	phone: { type: "string", minLength: 10, maxLength: 11 },
	birth_date: { type: "string", format: "date" },
	gender: {
		type: "string",
		enum: ["Masculino", "Feminino"],
	},
	status: {
		type: "string",
		enum: ["Ativo", "Inativo", "Bloqueado"],
	},
	type: {
		type: "string",
		enum: ["Pessoa fisica", "Pessoa juridica"],
	},
	address: {
		type: "object",
		properties: {
			type: {
				type: "string",
				enum: ["Residencial", "Comercial", "Outros"],
			},
			street: { type: "string" },
			number: { type: "string" },
			neighborhood: { type: "string" },
			city: { type: "string" },
			state: {
				type: "string",
				minLength: 2,
				maxLength: 3,
			},
			zip_code: {
				type: "string",
				minLength: 8,
				maxLength: 8,
			},
			country: { type: "string" },
		},
	},
};

export const clientInfoCU = {
	name: { type: "string" },
	cpf: { type: "string", pattern: "^\\d{11}$" },
	email: { type: "string", format: "email" },
	password: { type: "string", minLength: 3 },
	phone: { type: "string", minLength: 10, maxLength: 11 },
	birth_date: { type: "string", format: "date" },
	gender: { type: "string", enum: ["Masculino", "Feminino"] },
	status: {
		type: "string",
		enum: ["Ativo", "Inativo", "Bloqueado"],
	},
	type: {
		type: "string",
		enum: ["Pessoa fisica", "Pessoa juridica"],
	},
	address: {
		type: "object",
		properties: {
			type: {
				type: "string",
				enum: ["Residencial", "Comercial", "Outros"],
			},
			street: { type: "string" },
			number: { type: "string" },
			neighborhood: { type: "string" },
			city: { type: "string" },
			state: { type: "string", minLength: 2, maxLength: 3 },
			zip_code: {
				type: "string",
				minLength: 8,
				maxLength: 8,
			},
			country: { type: "string" },
		},
	},
};
