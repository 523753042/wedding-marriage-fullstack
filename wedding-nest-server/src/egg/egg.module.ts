import { Module } from '@nestjs/common';
import { EggService } from './egg.service';
import { EggController } from './egg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from './egg.entity'
import { SharedModule } from '../shared-module/shared.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Egg]),
    SharedModule
  ],
  providers: [EggService],
  controllers: [EggController]
})
export class EggModule { }
