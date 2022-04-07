import { Context, controller, Get, HttpResponseOK } from "@foal/core";
import { ItemController } from "./item.controller";
import { ListController } from "./list.controller";

export class ApiController {
	subControllers = [
    controller("/items", ItemController), 
    controller("/list", ListController)
  ];
}
