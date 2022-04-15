import { Context, controller, Get, HttpResponseOK } from "@foal/core";
import { ProductController } from "./product.controller";
import { ListController } from "./list.controller";

export class ApiController {
	subControllers = [
    controller("/products", ProductController), 
    controller("/list", ListController)
  ];
}
