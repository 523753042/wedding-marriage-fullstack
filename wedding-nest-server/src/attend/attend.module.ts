import { Module } from '@nestjs/common';
import { AttendService } from './attend.service';
import { AttendController } from './attend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attend } from './attend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attend]),
  ],
  providers: [AttendService],
  controllers: [AttendController]
})
export class AttendModule {}
