import { ConfigService } from '@nestjs/config';
import { NestMiddleware, Injectable } from '@nestjs/common';
import cookieSession from 'cookie-session';

@Injectable()
export class CookieSessionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService){}
  use(req: any, res: any, next: () => void) {
    cookieSession({
      name: 'session',
      keys: [this.configService.get<string>('COOKIE_KEY')], 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req, res, next);
  }
}
// $📋
