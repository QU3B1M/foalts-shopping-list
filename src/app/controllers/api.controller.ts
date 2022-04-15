import { ApiInfo, ApiServer, controller } from "@foal/core";
import { ProductController } from "./product.controller";
import { ListController } from "./list.controller";


@ApiInfo({
  title: 'Application API',
  version: '1.0.0'
})
@ApiServer({
  url: '/api'
})
export class ApiController {
	subControllers = [
    controller("/product", ProductController), 
    controller("/list", ListController)
  ];
}
