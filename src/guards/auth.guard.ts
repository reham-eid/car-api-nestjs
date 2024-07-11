import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// export class AuthGuard implements CanActivate{
//   canActivate(context : ExecutionContext){
//     const req = context.switchToHttp().getRequest()

//     return req.session.userId
//   }
// }

// usefull of gaurds to forbid access to certian routes
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // context >> incoming req
    const req = context.switchToHttp().getRequest();
    console.log('AuthGuard Session:', req.session);

    return req.session && req.session.userId;
  }
}
