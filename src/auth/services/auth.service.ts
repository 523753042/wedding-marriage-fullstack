import { Injectable, HttpModule, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
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
    private appid = 'wxe50e9afcabc5bad9';
    private secret = 'cf935a071ec0a9da2a45305f16989c4d';

    async auth(query): Promise<any> {
        const { code } = query;
        const authUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${code}&grant_type=authorization_code`
        this.http.get(authUrl)
    }

    /**
     *
     * 调用云函数功能
     * @param {*} body
     * @returns
     * @memberof AuthService
     */
    async invokeCloudFunction(body) {
        const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`;
        return new Promise((resolve, reject) => {
            this.http.get(URL).subscribe(res => {
                console.log('res', res.data.access_token);
                const { access_token } = res.data;
                if (!access_token) {
                    reject('access_token错误')
                }
                const FUNCTION_NAME = 'api';
                const ENV = 'zxy199123-8g2jzp6c66700418';
                const INVOKE_CLOUD_FUNCTION_URL = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ENV}&name=${FUNCTION_NAME}`;
                this.http.post(INVOKE_CLOUD_FUNCTION_URL, {
                    data: body.data || {},
                    url: body.url
                }).subscribe(result => {
                    resolve(JSON.parse(result.data.resp_data).data)
                    console.log(JSON.parse(result.data.resp_data).data)
                }, err => reject(err))
            })
        })

    }

}
