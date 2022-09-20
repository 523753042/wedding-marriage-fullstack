import { Remark } from './remark.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RemarkService {

  constructor(
    @InjectRepository(Remark)
    private eggRepository: Repository<Remark>
  ) {

  }
  create(createRemarkDto: CreateRemarkDto) {
    return 'This action adds a new remark';
  }

  findAll() {
    return `This action returns all remark`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remark`;
  }

  update(id: number, updateRemarkDto: UpdateRemarkDto) {
    return `This action updates a #${id} remark`;
  }

  remove(id: number) {
    return `This action removes a #${id} remark`;
  }
}
