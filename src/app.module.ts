import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieSession from 'cookie-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from "../typeorm.config"

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    //DB
    TypeOrmModule.forRoot(typeOrmConfig), // for ormconfig.js (Maigrations)
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report],
    //       synchronize: true, /** this flag >> for scale it can change structure DB
    //                             (del OR add some felid)
    //                             it is useful in development not in production
    //                             instade of this flag will use somthing called
    //                             Maigrations
    //        */  
          
    //     };
    //   },
    // }),
    //modules
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CookieSessionMiddleware).forRoutes('*');
  // }
}
// $📋
