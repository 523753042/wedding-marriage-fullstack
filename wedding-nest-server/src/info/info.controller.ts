import { ManagerService } from './../shared-module/manager.service';
import { InfoService } from './info.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Info } from './info.entity';
import { MARRIAGEINFO, FlashTextList } from 'src/static';

@Controller('info')
export class InfoController {

    constructor(
        private infoService: InfoService,
        private managerService: ManagerService,
    ) {
    }

    @Get('getinfo')
    async getInfo(@Query('openid') openid: string): Promise<Info> {
        // 没有管理员代表第一次进入

        const num = await this.managerService.getCount()

        // 没有管理员代表第一次进入
        if (!num) {
            await Promise.all([this.managerService.add(openid), this.infoService.add(MARRIAGEINFO)])
        }
        if (num === 1) {
            await this.managerService.add(openid)
        }
        const res = await this.infoService.getInfo()
        if (res) {
            res.photos = JSON.parse(res.photos);
            res.music = JSON.parse(res.music);
            // (res['music'] as any) = { "id": "cloud://zxy199123-8g2jzp6c66700418.7a78-zxy199123-8g2jzp6c66700418-1304252309/music/summertime.mp3", "name": "summertime.mp3", "url": "https://7a78-zxy199123-8g2jzp6c66700418-1304252309.tcb.qcloud.la/music/summertime.mp3" };
            res['indexFlashTexts'] = FlashTextList;
            const obj: any = {}
            for (let key in res) {
                obj['$' + key] = res[key]
            }
            return obj
        }
    }
    @Post('setInfo')
    async setInfo(@Body() body: any): Promise<any> {
        // 迁移过来的遗留问题，就只能这么手动解决了，暂时为找到更优雅的办法，先凑活
        if (body.data.photos) {
            body.data.photos = JSON.stringify(body.data.photos)
        };
        if (body.data.music) {
            body.data.music = JSON.stringify(body.data.music)
        };
        const info = await this.infoService.saveInfo(body);

        return { code: 2, msg: '信息修改成功！' }

    }
}
