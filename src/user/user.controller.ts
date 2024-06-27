import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query,Res, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/user.create.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current.user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';

// @UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('auth')
// @Serialize(UserDto)
// @UseInterceptors(currentUserInterseptor) // to make use @CurrentUser()
export class UserController {
  constructor(private userService : UserService ,
     private authService : AuthService ){}

  @Post('/sign-up')
  async signUp(@Body() body : createUserDto , @Session() session:any ){
    const user = await this.authService.signUp(body.email , body.password)
    session.userId = user.id
    return user
  }

  @Post('/sign-in')
@Serialize(UserDto)
  async signIn(
        @Body() body : createUserDto ,
        @Session() session:any  ,
        @Res() res : Response  ){
    const user = await this.authService.signIn(body.email , body.password)
    session.userId = user.id
    console.log('user',user);
    
    return res.json({response : user })
  }

  // @Get('/protected')
  // siginedInUser(@Session() session:any){
  //   return this.userService.findOne(session.userId)
  // }
  @Get('/protected')
  @UseGuards(AuthGuard)
  siginedInUser(@CurrentUser() user:User){
    return user
  }
  @Post('/sign-out')
  sginOut(@Session() session:any){
    return session.userId = null
  }
  @Get()
  async AllUsers( @Query('email') email : string, @Res() res: Response ){
    if (!email) {
      return res.send( await this.userService.find()) 
    }
    return res.send(await this.userService.find(email) )
  }

  
  @Get('/:id')
  async OneUser(@Param('id') id : string ,
                @Res() res: Response){
    const user = await this.userService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return res.send(user)
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id : string ,
    @Body() body : Partial<createUserDto>){
    return await this.userService.update(parseInt(id) , body)
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id : string ){
      await this.userService.remove(parseInt(id) )
  }
}
