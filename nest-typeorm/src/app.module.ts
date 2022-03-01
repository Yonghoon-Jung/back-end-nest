import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/boards.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'back-study.cnl5ijkdkejv.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'dydeorkf12',
      database: 'back_study',
      entities: [User, Board],
      synchronize: true, // 개발 모드일 때만 사용
    }),
    UsersModule,
    BoardsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
