import { Context, Get, HttpResponseOK } from '@foal/core';

export class ItemController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
