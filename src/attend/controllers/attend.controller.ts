import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query } from '@nestjs/common'
import { AttendService } from '../services/attend.service';
import { Attend } from '../models/attend.entity';


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

  @Get()
  index(): Promise<Attend[]> {
    return this.attendService.findAll();
  }
  @Get(':id')
  findDetail(@Param('id') id): Promise<Attend> {
    return this.attendService.findDetail(id)
  }

  @Post('create')
  async create(@Body() contactData: Attend): Promise<any> {
    return this.attendService.create(contactData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() contactData: Attend): Promise<any> {
    contactData.id = Number(id);
    console.log('Update #' + contactData.id)
    return this.attendService.update(contactData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.attendService.delete(id);
  }

}
