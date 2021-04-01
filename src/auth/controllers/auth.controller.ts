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
  index(@Query() query): Promise<any> {

    return this.authService.auth(query);
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
