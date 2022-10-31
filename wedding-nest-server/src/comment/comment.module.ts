import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { RemarkService } from './remark.service';
import { Remark } from './remark.entity';
import { SharedModule } from 'src/shared-module/shared.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Comment, Remark]),
  ],
  providers: [CommentService, RemarkService],
  controllers: [CommentController]
})
export class CommentModule { }
