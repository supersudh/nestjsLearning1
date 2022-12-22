import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { handleRetry } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../users/dtos/user.dto'
import { plainToClass, plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new(...args: any[]): {}
}

// Custom decorator
export function Serialize(dto: ClassConstructor) { // dto must be a class
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {
    
  }
  
  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled
    // by the request handler

    console.log('I am running before the handler');
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log('I am running before the response is sent out', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true // Exclude any other values in the outgoing response
        });
      })
    )
  }
}