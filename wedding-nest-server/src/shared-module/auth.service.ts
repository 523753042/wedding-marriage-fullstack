import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { of, scheduled, firstValueFrom } from 'rxjs';
import { tap, distinct, map } from 'rxjs/operators'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { config } from './../weapp-screct-key';
@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(private http: HttpService) {
        this.appid = config.appid;
        this.screctKey = config.secret;
    }
    private appid
    private screctKey

    /**
     * 
     * @param query 拿用户的code去换openid
     * @returns 
     */
    async auth(code): Promise<any> {
        const authUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.screctKey}&js_code=${code}&grant_type=authorization_code`;
        const res = await this.http.get(authUrl).toPromise();
        return res.data
    }
    /**
     * 敏感词解析
     */
    async msgSecCheck({ content, openid }): Promise<any> {
        try {
            const access_token = await this.getAccessToken();
            if (openid) {
                console.log('openid', openid);
                const msgSecCheckUrl = `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`;
                const res = await firstValueFrom(this.http.post(msgSecCheckUrl, {
                    openid: openid,
                    scene: 2,
                    version: 2,
                    content: content
                }));
                console.log('res', res.data);
                if (res.data.errcode === 0) {
                    const result = res.data.result;

                    if (result.label !== 100) {
                        return { code: 1, msg: '大喜日子不要搞这些😡😡😡！！！\n内容包含敏感信息！！！' }
                    }
                    return { code: 0 }
                }
                return res.data
            }
        } catch (error) {
            throw error
        }



    }
    /**
     * 获取临时access_token
     */
    async getAccessToken() {
        const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.screctKey}`;
        const res = await firstValueFrom(this.http.get(URL));
        const { access_token } = res.data;
        if (!access_token) {
            return Promise.reject('access_token错误')
        }
        return access_token
    }
}
