import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../models/comment.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CommentService {

    /**
     *
     */
    constructor(@InjectRepository(Comment)
    private contactRepository: Repository<Comment>) {
    }
    /**
     *
     */

    async findWithPage(query): Promise<[Comment[], number]> {
        const { pageSize, pageNum } = query;
        console.log(pageSize * pageNum - pageSize);
        return await this.contactRepository.findAndCount({
            skip: pageSize * pageNum - pageSize,
        });
    }

    async findAll(): Promise<Comment[]> {

        return await this.contactRepository.find();
    }

    async findDetail(id): Promise<Comment> {
        return await this.contactRepository.findOne(id)
    }

    async create(comment: Comment): Promise<Comment> {
        return await this.contactRepository.save(comment);
    }

    async update(comment: Comment): Promise<UpdateResult> {
        return await this.contactRepository.update(comment.id, comment);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }

    
}
