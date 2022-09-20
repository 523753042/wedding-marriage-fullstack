import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello() {
    return { message: '好吃好吃！', title: '这是一个很牛逼的页面' }
  }
}
