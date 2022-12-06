import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CommentService {

    /**
     *
     */
    constructor(@InjectRepository(Comment)
    private contactRepository: Repository<Comment>,
        private connection: Connection
    ) {
    }
    /**
     *
     */

    async findWithPage(query): Promise<Comment[]> {
        const { pageSize = 10, pageNum, isDel } = query;
        return await this.contactRepository.find({
            skip: pageSize * pageNum - pageSize,
            where: { isDel },
            order: { time: 'DESC' },
            take: pageSize
        });
    }

    async findAll(): Promise<Comment[]> {
        return await this.contactRepository.find({
            order: { time: 'DESC' },
        });
    }

    async findUnDeletedAll(): Promise<Comment[]> {
        return await this.contactRepository.find({
            order: { time: 'DESC' },
            where: { isDel: false },
        });
    }

    async findDeletedAll(): Promise<Comment[]> {
        return await this.contactRepository.find({
            order: { time: 'DESC' },
            where: { isDel: true },
        });
    }

    async findDetail(id): Promise<Comment> {
        return await this.contactRepository.findOne(id)
    }

    async create(comment: Comment): Promise<Comment> {
        return await this.contactRepository.save(comment);
    }

    async update(comment: Partial<Comment>): Promise<UpdateResult> {
        return await this.contactRepository.update(comment.id, comment);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }


}
