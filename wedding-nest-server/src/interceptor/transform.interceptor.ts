import { Injectable, NestInterceptor, CallHandler, ExecutionContext, } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                // data可能的数据格式
                // 1.直接是数据
                // 2.包了一层有data和code的对象{data:xx,code}
                // 所以要兼容处理一下
                if (!data.data && !data.code) {
                    return { data }
                }
                return data

            }),
            map(data => {
                return {
                    code: 0,
                    msg: 'success!',
                    ...data,
                    timestamp: new Date().valueOf()
                };
            }),
        );
    }
}
