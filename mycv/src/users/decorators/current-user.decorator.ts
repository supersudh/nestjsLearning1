import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    console.log('two');
    const request = context.switchToHttp().getRequest(); // gives the underlying request coming to the application
    return request.currentUser;
  }
);