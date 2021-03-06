import { Context, Get, HttpResponseCreated, HttpResponseNotFound, HttpResponseOK, Post, ValidateBody, ValidatePathParam } from '@foal/core';
import { List, Product } from '../entities';

const itemSchema = {
	type: "object",
	properties: {
    productId: { type: "integer" },
    price: { type: "number" },
    quantity: { type: "number" },
	},
  required: ["productId", "price", "quantity"],
};

const listSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    status: { type: "string" },
  },
  required: ["name"],
};

export class ListController {

  @Get('/')
  async getAllLists() {
    const lists = await List.find();
    return new HttpResponseOK(lists);
  }

  @Post('/')
	@ValidateBody(listSchema)
  async createList(ctx: Context) {
    const body = ctx.request.body;
    const list = new List();
    // Set list properties
    list.name = body.name;
    list.status = body.status ? body.status : 'open';
    // Save list to database & return response
    await list.save();
    return new HttpResponseCreated(body);
  }

  @Get('/:id')
  @ValidatePathParam('id', { type: 'integer' })
  async getListById(ctx: Context, { id }) {
    const list = await List.findOne({ id: id });
    if (!list) {
      return new HttpResponseNotFound();
    }
    return new HttpResponseOK(list);
  }

  @Post("/add_item")
	@ValidateBody(itemSchema)
  @ValidatePathParam('id', { type: 'integer' })
	async addItemToList(ctx: Context, { id }) {
		const body = ctx.request.body;
    const product = await Product.findOne({ id: body.productId });
		if (!product) {
      return new HttpResponseNotFound();
		}
		return new HttpResponseCreated(body);
	}

  @Post("/:id/remove_item")
  @ValidatePathParam('id', { type: 'integer' })
  async removeItemFromList(ctx: Context, { id }) {
    const body = ctx.request.body;
    const item = await Product.findOne({ id: body.id });
    const list = await List.findOne({ id: id });
    if (!list) {
      return new HttpResponseNotFound();
    }
    if (!item) {
      return new HttpResponseNotFound();
    }
    // Remove item from list
    list.items = list.items.filter(i => i.id !== item.id);
    // Save list to database & return response
    await list.save();
    return new HttpResponseOK(item);
  }  
}
