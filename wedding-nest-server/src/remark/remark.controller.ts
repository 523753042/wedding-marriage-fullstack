import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemarkService } from './remark.service';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';

@Controller('remark')
export class RemarkController {
  constructor(private readonly remarkService: RemarkService) {}

  @Post()
  create(@Body() createRemarkDto: CreateRemarkDto) {
    return this.remarkService.create(createRemarkDto);
  }

  @Get()
  findAll() {
    return this.remarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remarkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemarkDto: UpdateRemarkDto) {
    return this.remarkService.update(+id, updateRemarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remarkService.remove(+id);
  }
}
