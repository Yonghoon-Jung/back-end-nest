import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const { DB_HOST, DB_PORT, DB_USER, DB_PSWORD, DB_DATABASE } = process.env;

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'back-study.cnl5ijkdkejv.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'dydeorkf12',
  database: 'back_study',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
