import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { currentUserInterseptor } from './interceptors/current.user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
    // Import and configure TypeOrmModule to provide access to User repository
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService ,
    {
      provide: APP_INTERCEPTOR,
      useClass: currentUserInterseptor
    }
  ]
})
export class UserModule {}
