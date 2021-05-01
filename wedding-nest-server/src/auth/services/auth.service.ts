import { Injectable, HttpModule, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { of, scheduled } from 'rxjs';
import { tap, distinct, map } from 'rxjs/operators'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { config } from '../../weapp-screct-key';
@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(private http: HttpService) {
        this.appid = config.appid;
        this.screctKey = config.secret;
        this.ENV = config.ENV
    }

    private appid 
    private screctKey
    private ENV

    async auth(query): Promise<any> {
        const { code } = query;
        const authUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.screctKey}&js_code=${code}&grant_type=authorization_code`
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
        const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.screctKey}`;
        const res = await this.http.get(URL).toPromise();
        const { access_token } = res.data;
        if (!access_token) {
            return Promise.reject('access_token错误')
        }
        const FUNCTION_NAME = 'api';
        const INVOKE_CLOUD_FUNCTION_URL = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${this.ENV}&name=${FUNCTION_NAME}`;
        const data = await this.http.post(INVOKE_CLOUD_FUNCTION_URL, { data: body.data || {}, url: body.url }).toPromise();
        const simdata: any[] = JSON.parse(data.data.resp_data).data;
        return simdata

    }
    async getAttendAll() {
        const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.screctKey}`;
        const res = await this.http.get(URL).toPromise();
        const { access_token } = res.data;
        if (!access_token) {
            return Promise.reject('access_token错误')
        }
        const FUNCTION_NAME = 'api';
        const INVOKE_CLOUD_FUNCTION_URL = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${this.ENV}&name=${FUNCTION_NAME}`;
        const data = await this.http.post(INVOKE_CLOUD_FUNCTION_URL, { url: 'attend/getAll' }).toPromise();
        const simdata: any[] = JSON.parse(data.data.resp_data).data;
        const formatData = [];
        of(...simdata).pipe(
            map(value => {
                return { ...value.attendInfo, ...value.userInfo, ...value }
            })
        ).subscribe(v => {
            formatData.push(v);
        })
        return formatData
    }



    async getAllCommentList(dis: boolean) {
        const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.screctKey}`;
        const res = await this.http.get(URL).toPromise();
        const { access_token } = res.data;
        if (!access_token) {
            return Promise.reject('access_token错误')
        }
        const FUNCTION_NAME = 'api';
        const INVOKE_CLOUD_FUNCTION_URL = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${this.ENV}&name=${FUNCTION_NAME}`;
        const data = await this.http.post(INVOKE_CLOUD_FUNCTION_URL, { url: 'comment/getAllList' }).toPromise();
        const simdata: any[] = JSON.parse(data.data.resp_data).data;
        const formatData = []
        if (!dis) {
            return simdata
        } else {
            of(...simdata).pipe(
                distinct(value => value._openid)
            ).subscribe(v => {
                formatData.push(v);
            })
            return formatData
        }

    }
}
