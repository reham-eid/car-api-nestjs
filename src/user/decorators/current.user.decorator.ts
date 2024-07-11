import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator( 
// to simplify the process of extracting specific pieces of data
// from the incoming request 
//and making them easily accessible within controller methods.
  ( data: never, context: ExecutionContext)=>{
  // 1-Any data passed to the decorator argument when it is used.
  // 2-provides access to the details of the incoming request.
  const req = context.switchToHttp().getRequest()
  
  return req.currentUser
}
)

