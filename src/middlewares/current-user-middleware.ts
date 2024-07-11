import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';
// import { User } from '../user/user.entity';

// will have a user entity instance
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     } 
//   }
// }
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Session:', req.session);
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.userService.findOne(userId);
      // @ts-expect-error back soon
      req.currentUser = user;
    }
    // if (req.session && req.session.userId) {
    // const user = await this.userService.findOne(req.session.userId);
    //   req.currentUser = user; // Attach user to request object if found
    //   console.log('Current User:', user);

    next();
  }
}
// $📋 //
