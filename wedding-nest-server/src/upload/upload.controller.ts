import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { Readable } from 'stream';
import { UploadService } from './upload.service';
import { Response } from 'express'
@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService
    ) { }
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Body() body) {
        // return this.uploadService.uploadDatabaseFile(fil)
        console.log('file', file);
        console.log('body', body);
        return this.uploadService.uploadDatabaseFile(file.buffer, file.originalname)
    }

    @Get(':id/readimage')
    async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
        console.log('11', id);

        const file = await this.uploadService.getFileById(id);

        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': 'image'
        })
        stream.pipe(response)
    }
}
