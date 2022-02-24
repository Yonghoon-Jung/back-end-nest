import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from './entities/server.entities';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverRepository: Repository<Server>,
  ) {}

  findAll(): Promise<Server[]> {
    return this.serverRepository.find();
  }

  async findOne(id: number) {
    return await this.serverRepository.findOne(id);
  }

  async create(server: Server): Promise<void> {
    await this.serverRepository.save(server);
  }

  async delete(id: number): Promise<void> {
    await this.serverRepository.delete(id);
  }

  async update(id: number, server: Server): Promise<void> {
    const existServer = await this.serverRepository.findOne(id);

    if (existServer) {
      await getConnection()
        .createQueryBuilder()
        .update(Server)
        .set({ name: server.name, other: server.other })
        .where('id = :id', { id })
        .execute();
    }
  }
}
