import type { FastifyInstance } from "fastify";
import { GetProducts } from "../controllers/get-products";
import { GetProduct } from "../controllers/get-product";
import { CreateProduct } from "../controllers/create-product";
import { UpdateProduct } from "../controllers/update-product";
import { DeleteProduct } from "../controllers/delete-product";
import { GetProductsByName } from "../controllers/get-products-by-name";
import { GetProductsByPriceRange } from "../controllers/get-products-by-price-range";
import { UpdateProductStockQuantity } from "../controllers/update-product-stock-quantity";

export async function ProductRoutes(fastify: FastifyInstance) {
	fastify
		.get("/", new GetProducts().handle)
		.get("/:id", new GetProduct().handle)
		.get("/search", new GetProductsByName().handle)
		.get("/price", new GetProductsByPriceRange().handle)
		.patch("/:id/stock", new UpdateProductStockQuantity().handle)
		.post("/create", new CreateProduct().handle)
		.put("/update/:id", new UpdateProduct().handle)
		.delete("/delete/:id", new DeleteProduct().handle);
}
