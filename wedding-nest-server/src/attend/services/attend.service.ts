import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attend } from '../models/attend.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class AttendService {

    /**
     *
     */
    constructor(@InjectRepository(Attend)
    private contactRepository: Repository<Attend>) {
    }
    /**
     *
     */

    async findWithPage(query): Promise<[Attend[], number]> {
        const { pageSize, pageNum } = query;
        console.log(pageSize * pageNum - pageSize);
        return await this.contactRepository.findAndCount({
            skip: pageSize * pageNum - pageSize,
        });
    }

    async findAll(): Promise<Attend[]> {

        return await this.contactRepository.find();
    }

    async findDetail(id): Promise<Attend> {
        return await this.contactRepository.findOne(id)
    }

    async create(attend: Attend): Promise<Attend> {
        return await this.contactRepository.save(attend);
    }

    async update(attend: Attend): Promise<UpdateResult> {
        return await this.contactRepository.update(attend.id, attend);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }
}
