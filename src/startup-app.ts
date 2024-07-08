import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

// can reuse it in development env && testing process
export const startUp = (app: any) => {
  app.use(
    cookieSession({
      keys: ['reham'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};
