import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query } from '@nestjs/common'
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.entity';


@Controller('comment')
export class CommentController {

  /**
   *
   */
  constructor(private commentService: CommentService) {
  }

  @Get('getList')
  getWithPage(@Query() query): Promise<[Comment[], number]> {
    console.log(query);
    return this.commentService.findWithPage(query)
  }

  @Get('getAllList')
  index(): Promise<Comment[]> {
    return this.commentService.findAll();
  }
  @Post('updateList')
  update(@Param('id') id, @Body() contactData: Comment): Promise<any> {
    contactData.id = Number(id);
    return this.commentService.update(contactData)
  }

  @Post('add')
  async create(@Body() contactData: Comment): Promise<any> {
    return this.commentService.create(contactData);
  }

  // @Put(':id/update')
  // async update(@Param('id') id, @Body() contactData: Comment): Promise<any> {
  //   contactData.id = Number(id);
  //   console.log('Update #' + contactData.id)
  //   return this.attendService.update(contactData);
  // }

  // @Delete(':id/delete')
  // async delete(@Param('id') id): Promise<any> {
  //   return this.attendService.delete(id);
  // }

}
