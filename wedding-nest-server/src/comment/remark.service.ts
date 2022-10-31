import { Remark } from './remark.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RemarkService {

  constructor(
    @InjectRepository(Remark)
    private remarkRepository: Repository<Remark>
  ) {

  }
  create(createRemarkDto: Remark) {
    return 'This action adds a new remark';
  }

  findAll(): Promise<Remark[]> {
    return this.remarkRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} remark`;
  }

  update(id: number, updateRemarkDto: Remark) {
    return `This action updates a #${id} remark`;
  }

  remove(id: number) {
    return `This action removes a #${id} remark`;
  }
}
