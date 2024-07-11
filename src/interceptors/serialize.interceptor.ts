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
import { plainToClass, plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
  // UseInterceptors: filtering the outgoing response
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('run before request handler ', context);
    console.log('**************************');

    return handler.handle().pipe(
      map((data: any) => {
        console.log('run before response is send out ', data);

        const transformed = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });

        console.log('**************************');

        console.log('Transformed Data(after response):', transformed);
        return transformed;
      }),
    );

    return handler.handle().pipe(
      map((data: any) => {
        // data in response
        console.log('run before response is send out ', data);
        const transformed = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        console.log('**************************');

        console.log('Transformed Data(after response):', transformed);
        return transformed;
      }),
    );
  }
}
