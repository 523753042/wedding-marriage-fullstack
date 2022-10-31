import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query } from '@nestjs/common'
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { Remark } from './remark.entity';
import { RemarkService } from './remark.service';
import { AuthService } from '../shared-module/auth.service';
import { check, robot } from '../static';


@Controller('comment')
export class CommentController {

  /**
   *
   */
  constructor(private commentService: CommentService,
    private remarkService: RemarkService,
    private authService: AuthService
  ) {
  }

  @Get('getList')
  getWithPage(@Query() query): Promise<Comment[]> {
    return this.commentService.findWithPage(query)
  }

  @Get('getAllList')
  getAllList(@Query() query): Promise<Comment[]> {
    const { isDel } = query;
    if (isDel && isDel == '1') {
      return this.commentService.findDeletedAll();
    }
    if (isDel && isDel == '0') {
      return this.commentService.findAll()
    }
    return this.commentService.findAll();
  }

  @Get('getAllUnDelList')
  getAllUnDelList(@Query() query): Promise<Comment[]> {
    return this.commentService.findUnDeletedAll();
  }

  @Get('getAllDelList')
  getAllDelList(@Query() query): Promise<Comment[]> {
    return this.commentService.findDeletedAll();
  }

  @Post('updateList')
  update(@Body() body: Comment): Promise<any> {
    const { id, isDel } = body;
    return this.commentService.update({ id: +id, isDel })
  }

  @Post('add')
  async create(@Body() comment: Comment): Promise<any> {
    try {
      const openid = comment['openid']
      {
        const { code, msg } = await this.authService.msgSecCheck({ content: comment.comment, openid })
        if (code === 1) {
          return { code, msg }
        }
      }

      // 自己low逼检测
      {
        const { code, msg } = await check(comment)
        if (code !== 0) {
          return { code, msg }
        }
      }

      comment.time = new Date().valueOf();
      comment._openid = openid;
      comment.isDel = false;
      const { code, msg } = await robot(comment)
      const data = await this.commentService.create(comment);

      return { code, msg, data }
    } catch (error) {
      console.log('error', error);
      return { code: 1 }

    }

  }
  /**
   * 获取所有评论模板
   */
  @Get('getCommentTemplate')
  async getCommentTemplate(): Promise<Remark[]> {
    return this.remarkService.findAll();
  }
}
