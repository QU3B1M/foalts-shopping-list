import { Context, Get, HttpResponseOK } from '@foal/core';

export class ListController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
