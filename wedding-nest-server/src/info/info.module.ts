import { SharedModule } from './../shared-module/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoController } from './info.controller';
import { Info } from './info.entity';
import { InfoService } from './info.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Info]),
    SharedModule
  ],
  controllers: [InfoController],
  providers: [InfoService]
})
export class InfoModule { }
