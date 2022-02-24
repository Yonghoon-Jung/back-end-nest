import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { Server } from './entities/server.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  exports: [TypeOrmModule],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
