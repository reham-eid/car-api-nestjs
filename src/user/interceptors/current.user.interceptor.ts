import { UserService } from './../user.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class currentUserInterseptor implements NestInterceptor{

  constructor(private userService:UserService){}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
  const req = context.switchToHttp().getRequest() // have access with currentUser Decorator
    const { userId } = req.session || {}
    if(userId){
      const user = this.userService.findOne(userId)
      req.currentUser = user // connect Interseptor with decorator
      
    }

    return next.handle()
  }
}