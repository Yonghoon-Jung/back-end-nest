import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const { type, port, host, username, password, database, synchronize } =
  config.get('db');
const { DB_HOST, DB_PORT, DB_USER, DB_PSWORD, DB_DATABASE } = process.env;

export const typeORMConfig: TypeOrmModuleOptions = {
  type,
  host: DB_HOST || host,
  port: DB_PORT || port,
  username: DB_USER || username,
  password: DB_PSWORD || password,
  database: DB_DATABASE || database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize,
};
