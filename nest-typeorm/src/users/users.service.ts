import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(no: number): Promise<User> {
    return this.usersRepository.findOne(no);
  }

  async create(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }
  async delete(no: number): Promise<void> {
    await this.usersRepository.delete(no);
  }

  async update(no: number, user: User): Promise<void> {
    const existedUser = await this.findOne(no);

    if (existedUser) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          id: user.id,
          password: user.password,
          name: user.name,
        })
        .where('no = :no', { no })
        .execute();
    }
  }
}
