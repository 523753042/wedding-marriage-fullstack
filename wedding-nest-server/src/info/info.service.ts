import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './info.entity';

@Injectable()
export class InfoService {

    constructor(
        @InjectRepository(Info)
        private infoRepository: Repository<Info>) {
    }

    async getInfo() {
        return this.infoRepository.findOne({ where: { _id: null } });
        // return this.infoRepository.find();
    }
    async add(data) {
        return this.infoRepository.create(data);
    }
    async saveInfo(data) {
        
        return await this.infoRepository.update(data.id, data.data);
    }
}
