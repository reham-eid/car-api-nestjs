import { UserService } from './../user.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class currentUserInterseptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    // have access with currentUser Decorator
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user; // connect Interseptor with decorator
      console.log('Current User:', user);
    }

    return next.handle();
  }
}
// $📋
