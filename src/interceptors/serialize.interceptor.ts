/**
 * name of file : serialize.interceptor
 * reasone : it going to take an object then serialize it into JSON
 * for : all-modules
 */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('run befor request handler ', context);
    console.log('**************************');

    return next.handle().pipe(
      map((data: any) => {
        // data in response
        console.log('run befor response is send out ', data);
        const transformed = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        console.log('**************************');

        console.log('Transformed Data:', transformed);
        return transformed;
      }),
    );
  }
}
