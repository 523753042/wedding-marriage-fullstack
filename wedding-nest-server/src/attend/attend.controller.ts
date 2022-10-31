import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query } from '@nestjs/common'
import { AttendService } from './attend.service';
import { Attend } from './attend.entity';


@Controller('attend')
export class AttendController {

  /**
   *
   */
  constructor(private attendService: AttendService) {
  }

  @Get('list')
  getWithPage(@Query() query): Promise<[Attend[], number]> {
    console.log(query);
    return this.attendService.findWithPage(query)
  }

  @Get('getAll')
  index(): Promise<Attend[]> {
    return this.attendService.findAll();
  }
  @Get('get')
  async findDetail(@Query('openid') openid): Promise<Attend> {
    console.log('openid', openid);
    const res = await this.attendService.findDetail(openid);
    res.attendInfo = JSON.parse(res.attendInfo);
    res.userInfo = JSON.parse(res.userInfo);
    return res
  }

  @Post('add')
  async create(@Body() attend: Attend): Promise<any> {
    attend.attendInfo = JSON.stringify(attend.attendInfo)
    attend.userInfo = JSON.stringify(attend.attendInfo)
    return this.attendService.create(attend);
  }

  @Post('update')
  async update(@Body() attend: Attend): Promise<any> {
    attend.attendInfo = JSON.stringify(attend.attendInfo)
    attend.userInfo = JSON.stringify(attend.userInfo)
    return this.attendService.update(attend);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.attendService.delete(id);
  }

}
