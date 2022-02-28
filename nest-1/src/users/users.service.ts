import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Movie ID: ${id} Not found.`);
    }
    return user;
  }

  remove(id: number) {
    this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  create(userData: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }
  // async update(): Promise<void> {
  //   await this.users.update();
  // }
}
