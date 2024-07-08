import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    console.log('Session:', req.session); // Ensure session is logged
    if (req.session && req.session.userId) {
      const user = await this.userService.findOne(req.session.userId);
      req.currentUser = user; // Attach user to request object if found
    }
    next();
  }
}
