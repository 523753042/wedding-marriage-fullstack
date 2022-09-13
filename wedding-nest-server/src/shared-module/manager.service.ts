import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerService {

  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>) {
  }
  async getCount() {
    return this.managerRepository.count()
  }

  async add(id) {
    return this.managerRepository.create({ OPENID: id })
  }
}
