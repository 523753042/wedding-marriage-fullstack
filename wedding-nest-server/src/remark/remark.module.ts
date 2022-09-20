import { Remark } from './remark.entity';
import { Module } from '@nestjs/common';
import { RemarkService } from './remark.service';
import { RemarkController } from './remark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Remark]),
  ],
  controllers: [RemarkController],
  providers: [RemarkService]
})
export class RemarkModule {}
