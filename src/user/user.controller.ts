import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/user.create.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current.user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
// import { currentUserInterseptor } from './interceptors/current.user.interceptor'; // in user.module

// @UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(new SerializeInterceptor(UserDto))
// @UseInterceptors(currentUserInterseptor) // to make use @CurrentUser()
@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @Get('/protected')
  // siginedInUser(@Session() session: any) {
  //   console.log('Session in protected:', session);
  //   return this.userService.findOne(session.userId);
  // }
  @Get('/protected')
  @UseGuards(AuthGuard)
  siginedInUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('/sign-out')
  sginOut(@Session() session: any) {
    session.userId = null;
    console.log('Session after sign-out:', session);
  }
  @Post('/sign-up')
  async signUp(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    console.log('Session after sign-up:', session);
    return user;
  }

  @Post('/sign-in')
  async signIn(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    console.log('Session after sign-in:', session);
    return user;
  }
  @Get()
  async AllUsers(@Query('email') email: string) {
    if (!email) {
      return this.userService.find();
    }
    return this.userService.find(email);
  }

  @Get('/:id')
  async OneUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<createUserDto>,
  ) {
    return await this.userService.update(parseInt(id), body);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.userService.remove(parseInt(id));
  }
}
