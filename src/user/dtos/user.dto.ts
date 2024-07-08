import { Exclude, Expose } from 'class-transformer'


export class UserDto{ 

  @Expose()
  id:number

  @Expose()
  email:string

  @Exclude()
  // @IsStrongPassword()
  // @Expose()
  password:string

}