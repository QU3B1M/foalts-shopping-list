import { Context, Delete, Get, HttpResponseCreated, HttpResponseNotFound, HttpResponseOK, Post, Put, ValidateBody, ValidatePathParam } from "@foal/core";
import { Product } from "../entities";

const productSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		category: { type: "string" },
	},
	required: ["name", "category"],
};

export class ProductController {
	@Get("/")
	async getAllProducts() {
		const products = await Product.find();
		return new HttpResponseOK(products);
	}

	@Get("/:id")
	@ValidatePathParam("id", { type: "integer" })
	async getProductById(ctx: Context, { id }) {
		const product = await Product.findOne({ id: id });
		if (!product) {
			return new HttpResponseNotFound();
		}
		return new HttpResponseOK(product);
	}

	@Post("/")
	@ValidateBody(productSchema)
	async createProduct(ctx: Context) {
		const body = ctx.request.body;
		const product = new Product();
		// Set product properties
		product.name = body.name;
		product.category = body.category;
		// Save product to database & return response
		await product.save();
		return new HttpResponseCreated(body);
	}

	@Put("/:id")
	@ValidateBody(productSchema)
	@ValidatePathParam("id", { type: "integer" })
	async updateProduct(ctx: Context, { id }) {
		const body = ctx.request.body;
		const product = await Product.findOne({ id: id });
		if (!product) {
			return new HttpResponseNotFound();
		}
		// Update product properties
		product.name = body.name;
		product.category = body.category;
		// Save product to database & return response
		await product.save();
		return new HttpResponseOK(body);
	}

  @Delete("/:id")
  @ValidatePathParam("id", { type: "integer" })
  async deleteProduct(ctx: Context, { id }) {
    const product = await Product.findOne({ id: id });
    if (!product) {
      return new HttpResponseNotFound();
    }
    await product.remove();
    return new HttpResponseOK();
  }
}
