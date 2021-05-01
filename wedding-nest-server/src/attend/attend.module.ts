import { Module } from '@nestjs/common';
import { AttendService } from './services/attend.service';
import { AttendController } from './controllers/attend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attend } from './models/attend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attend]),
  ],
  providers: [AttendService],
  controllers: [AttendController]
})
export class AttendModule {}
