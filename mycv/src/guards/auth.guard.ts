import {
  CanActivate,
  ExecutionContext
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    return request.session.userId; // if returned falsy value, it will prevent access to a given handler or a controller.
  }
}