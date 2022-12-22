import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

declare global {
  namespace Express { // go and find express library
    interface Request { // find an interface named Request
      currentUser?: User; // We're gonna add one more property to that
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user; // according to TS, currentUser is a custom property
    }
    next();
  }
  
}