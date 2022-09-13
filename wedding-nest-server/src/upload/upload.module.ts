import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { Upload } from './upload.entity';
import { UploadService } from './upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
