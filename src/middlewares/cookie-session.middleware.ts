import { NestMiddleware, Injectable } from '@nestjs/common';
import cookieSession from 'cookie-session';

@Injectable()
export class CookieSessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    cookieSession({
      name: 'session',
      keys: ['My_secret_key'], 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req, res, next);
  }
}
