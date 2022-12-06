import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';

@Injectable()
export class UploadService {

    constructor(
        @InjectRepository(Upload)
        private uploadRepository: Repository<Upload>) {
    }

    async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
        const newFile = this.uploadRepository.create({
            filename,
            data: dataBuffer
        })
        await this.uploadRepository.save(newFile);
        return { id: newFile.id, filename };
    }

    async getFileById(fileId: number) {
        const file = await this.uploadRepository.findOneBy({ id: fileId });
        if (!file) {
            throw new NotFoundException();
        }
        return file;
    }
    async deleteById(fileId: number) {
        return await this.uploadRepository.delete(fileId)
    }
}
