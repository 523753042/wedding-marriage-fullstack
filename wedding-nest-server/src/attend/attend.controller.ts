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
  async getWithPage(@Query() query): Promise<[Attend[], number]> {
    console.log(query);
    const list = await this.attendService.findWithPage(query)
    list[0].forEach(data => {
      if (data.attendInfo) {
        data.attendInfo = JSON.parse(data.attendInfo)
      }
      if (data.userInfo) {
        data.userInfo = JSON.parse(data.userInfo)
      }
    })
    return list
  }

  @Get('getAll')
  async index(): Promise<Attend[]> {
    const list = await this.attendService.findAll()
    list.forEach(data => {
      if (data.attendInfo) {
        data.attendInfo = JSON.parse(data.attendInfo)
      }
      if (data.userInfo) {
        data.userInfo = JSON.parse(data.userInfo)
      }
    })
    return list
  }
  @Get('get')
  async findDetail(@Query('openid') openid): Promise<Attend> {
    const res = await this.attendService.findDetail(openid);
    if (res && res.attendInfo) {
      res.attendInfo = JSON.parse(res.attendInfo);
    }
    if (res && res.userInfo) {
      res.userInfo = JSON.parse(res.userInfo);
    }
    return res
  }

  @Post('add')
  async create(@Body() attend: Attend): Promise<any> {
    attend.time = new Date().valueOf().toString()
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
