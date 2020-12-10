import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query } from '@nestjs/common'
import { AuthService } from '../services/auth.service';


@Controller('auth')
export class AuthController {

  /**
   *
   */
  constructor(private authService: AuthService) {
  }

  @Get()
  index(@Query() query): Promise<any> {
    
    return this.authService.auth(query);
  }

}
