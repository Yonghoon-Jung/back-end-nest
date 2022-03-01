import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':no')
  findOne(@Param('no') no: number): Promise<User> {
    return this.usersService.findOne(no);
  }

  @Post()
  create(@Body() user: User) {
    this.usersService.create(user);
  }

  @Delete(':no')
  delete(@Param('no') no: number) {
    return this.usersService.delete(no);
  }

  @Put(':no')
  update(@Param('no') no: number, @Body() user: User) {
    this.usersService.update(no, user);
    return '업데이트 완료';
  }
}
