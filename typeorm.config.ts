import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], //['**/*.entity.js']
  migrations: [__dirname + '/../migrations/*{.ts,.js}'], //['migrations/*.js']
  synchronize: false,
};

export default config;
