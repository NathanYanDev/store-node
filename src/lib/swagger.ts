import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export function swaggerLoadder() {
	return {
		async load(fastify: FastifyInstance) {
			await fastify.register(fastifySwagger, {
				openapi: {
					info: {
						title: "Fastbuy",
						description: "Fastbuy API",
						version: "1.0",
					},
					servers: [{ url: "http://localhost:3333" }],
					components: {
						securitySchemes: {
							bearerAuth: {
								type: "http",
								scheme: "bearer",
								bearerFormat: "JWT",
							},
						},
					},
				},
			});

			await fastify.register(fastifySwaggerUi, {
				routePrefix: "/docs",
				uiConfig: {
					docExpansion: "full",
					deepLinking: false,
				},
				uiHooks: {
					onRequest: (_, _reply, next) => {
						next();
					},
					preHandler: (_, _reply, next) => {
						next();
					},
				},
				staticCSP: true,
				transformStaticCSP: (header) => header,
				transformSpecification: (swaggerObject, _request, _reply) => {
					return swaggerObject;
				},
				transformSpecificationClone: true,
			});
		},
	};
}
