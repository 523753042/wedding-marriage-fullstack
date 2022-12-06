import { Body, Catch, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, MulterModule } from '@nestjs/platform-express'
import { Readable } from 'stream';
import { UploadService } from './upload.service';
import { Response } from 'express'
const multiparty = require('multiparty');

@Controller('upload')
@Catch()
export class UploadController {
    constructor(
        private uploadService: UploadService
    ) { }
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Body() body, @Req() request) {
        console.log('file', file);
        console.log('body', body);
        return this.uploadService.uploadDatabaseFile(file.buffer, (body && body.originalname) || file.originalname)
    }

    @Get(':id/readimage')
    async readimage(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const file = await this.uploadService.getFileById(id);

        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': 'image'
        })
        stream.pipe(response)
    }
    @Get(':id/readaudio')
    async readaudio(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
        const file = await this.uploadService.getFileById(id);

        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': 'audio/mpeg'
        })
        stream.pipe(response)
    }

    @Get(':id/delete')
    async deleteFile(@Param('id', ParseIntPipe) id: number) {
        return this.uploadService.deleteById(id)
    }
}
