import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

// export class AuthGuard implements CanActivate{
//   canActivate(context : ExecutionContext){
//     const req = context.switchToHttp().getRequest()

//     return req.session.userId
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('AuthGuard Session:', request.session);
    return request.session && request.session.userId;
  }
}
