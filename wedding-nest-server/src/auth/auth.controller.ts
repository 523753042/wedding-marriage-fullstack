import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query, HttpCode } from '@nestjs/common'
import { AuthService } from '../shared-module/auth.service';


@Controller('auth')
export class AuthController {

  /**
   *
   */
  constructor(private authService: AuthService) {
  }

  @Get()
  async index(@Query() query): Promise<any> {
    const res = await this.authService.auth(query.code);
    return res
  }
}
