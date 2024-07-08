import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { startUp } from './startup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // startUp(app)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')
  await app.listen(port);
}
bootstrap();
