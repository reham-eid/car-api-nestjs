import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { CookieSessionMiddleware } from './middlewares/cookie-session.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite',
      entities:[User , Report],
      synchronize:true
    }),
    UserModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CookieSessionMiddleware)
    .forRoutes('*')
  }
}
