import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  exports: [TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
