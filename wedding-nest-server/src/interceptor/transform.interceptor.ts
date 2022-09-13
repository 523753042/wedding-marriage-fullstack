import { Injectable, NestInterceptor, CallHandler, ExecutionContext, } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                return {
                    result: {
                        code: 0,
                        data,
                        msg: 'success!'
                    },
                    timestamp: new Date().valueOf()
                };
            }),
        );
    }
}
