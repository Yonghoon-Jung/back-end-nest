import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
  providers: [WebsocketGateway],
})
export class AppModule {}
