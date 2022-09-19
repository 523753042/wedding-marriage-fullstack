import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query, HttpCode } from '@nestjs/common'
import { AuthService } from '../services/auth.service';


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
    console.log('res', res);
    return res
  }

  @Post('invokeCloudFunction')
  @HttpCode(200)
  invokeCloudFunction(@Body() request): any {
    const res = this.authService.invokeCloudFunction(request)
    return res
  }

  @Get('getAllCommentList')
  getAllCommentListAndDistinct() {
    const res = this.authService.getAllCommentList(false)
    return res
  }

  @Get('getAttendAll')
  getAllCommentList() {
    const res = this.authService.getAttendAll()
    return res
  }
}
