import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';

@Injectable()
export class EggService {

    constructor(
        @InjectRepository(Egg)
        private eggRepository: Repository<Egg>) {
    }

    async create(data: Egg) {
        console.log('egg', data);

        return this.eggRepository.save(data)
    }

    async getListByPage({ pageSize = 20, pageNum }) {
        const res = await this.eggRepository.count()
        console.log('res', res);

        return this.eggRepository.find({
            skip: pageSize * pageNum - pageSize,
            take: pageSize
        })
    }
    async find(id) {
        return this.eggRepository.findOneBy({ _id: id })
    }
    async getCount() {
        return this.eggRepository.count();
    }
}
