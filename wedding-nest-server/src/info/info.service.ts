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
        return this.infoRepository.findOne();
    }
    async add(data) {
        return this.infoRepository.create(data);
    }
}
