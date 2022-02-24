import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createNewUser(@Req() request: Request) {
    const a = request.body;
    console.log(a);
    return this.usersService.createNewUser(a);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return this.usersService.findOne(id);
  }

  // @Put()
  // update(@Body() body) {
  //   console.log(body);
  //   return this.usersService.update(body);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
