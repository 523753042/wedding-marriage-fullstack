import { Injectable, HttpModule, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(private http: HttpService) {
    }
    /**
     *
     */

    async auth(query): Promise<any> {
        const { code } = query;
        const appid = 'wxe50e9afcabc5bad9';
        const secret = 'cf935a071ec0a9da2a45305f16989c4d';
        const authUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        this.http.get(authUrl)

    }

}
