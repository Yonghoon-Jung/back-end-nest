import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServerModule } from './server/server.module';
import { logger } from './common/middleware/logger.middleware';
import { ServerController } from './server/server.controller';
import { Server } from './server/entities/server.entities';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'back-study.cnl5ijkdkejv.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'dydeorkf12',
      database: 'back_study',
      entities: ['dist/**/*.entity{.ts,.js}', Server],
      synchronize: true,
    }),
    ServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(ServerController);
  }
}
