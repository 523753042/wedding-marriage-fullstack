import { ManagerService } from './../shared-module/manager.service';
import { InfoService } from './info.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Info } from './info.entity';
import { MARRIAGEINFO } from 'src/static/marriage.info';

@Controller('info')
export class InfoController {

    constructor(
        private infoService: InfoService,
        private managerService: ManagerService,
    ) {

    }

    @Get('getinfo')
    async getInfo(@Param('openid') id: string): Promise<Info> {
        // 没有管理员代表第一次进入

        const num = await this.managerService.getCount()
        console.log('num', num);

        // 没有管理员代表第一次进入
        if (!num) {
            await Promise.all([this.managerService.add(id), this.infoService.add(MARRIAGEINFO)])
        }
        if (num === 1) {
            await this.managerService.add(id)
        }
        const res = await this.infoService.getInfo()
        if (res) {
            res.photos = JSON.parse(res.photos);
            res.music = JSON.parse(res.music);
            const obj: any = {}
            for (let key in res) {
                obj['$' + key] = res[key]
            }
            return obj
        }
    }
}