export const sellerInfoR = {
	type: "object",
	properties: {
		name: { type: "string" },
		email: { type: "string", format: "email" },
		phone: { type: "string", minLength: 10, maxLength: 11 },
		cpf_cnpj: {
			type: "string",
			minLength: 11,
			maxLength: 14,
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
		type: {
			type: "string",
			enum: ["Pessoa fisica", "Pessoa juridica"],
		},
		status: {
			type: "string",
			enum: ["Ativo", "Inativo", "Bloqueado"],
		},
		avg_rating: { type: "number" },
		count_ratings: { type: "integer" },
		delivery_time: { type: "string" },
		delivery_type: {
			type: "string",
			enum: ["Envio proprio", "Envio marketplace"],
		},
		ratings: {
			type: "array",
			items: {
				type: "object",
				properties: {
					rating: { type: "number" },
					comment: { type: "string" },
					review_date: {
						type: "string",
						format: "date",
					},
				},
			},
		},
	},
};

export const sellerInfoCU = {
	name: { type: "string" },
	email: { type: "string", format: "email" },
	password: { type: "string", minLength: 3 },
	phone: { type: "string", minLength: 10, maxLength: 11 },
	cpf_cnpj: {
		type: "string",
		minLength: 11,
		maxLength: 14,
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
	type: {
		type: "string",
		enum: ["Pessoa fisica", "Pessoa juridica"],
	},
	delivery_time: { type: "number" },
	delivery_type: {
		type: "string",
		enum: ["Envio proprio", "Envio marketplace"],
	},
};
