import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { EggService } from './egg.service';
import { money } from '../static'
import { AuthService } from '../shared-module/auth.service';
@Controller('egg')
export class EggController {

    constructor(
        private eggService: EggService,
        private authService: AuthService
    ) {

    }

    @Post('clue')
    async club(@Body() body) {
        const { openid } = body;
        console.log('openid', openid);
        if (!openid) {
            return { code: 1, msg: '缺少用户身份标志' }
        }
        // 先查找是否有这条记录
        const result = await this.eggService.find(openid)
        if (result) return result
        // 没有该记录则新增记录
        const count = await this.eggService.getCount()
        const params = {
            _id: openid,
            rank: count + 1,
            del: false,
            time: Date.now(),
            money: money(),
            ...body
        };
        await this.eggService.create(params)
        return params
    }

    @Get('getList')
    async getList(@Query() query) {
        return this.eggService.getListByPage(query)
    }
}
