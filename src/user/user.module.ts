import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from '../middlewares/current-user-middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Import and configure TypeOrmModule to provide access to User repository
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: currentUserInterseptor,
    // },
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
// $📋
