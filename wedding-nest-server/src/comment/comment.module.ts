import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
