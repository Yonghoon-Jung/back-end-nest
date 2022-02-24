import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ServerService } from './server.service';
import { Server } from './entities/server.entities';

@Controller('server')
export class ServerController {
  constructor(private serverService: ServerService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.serverService.findAll();
  }

  @Post()
  async create(@Body() server: Server) {
    this.serverService.create(server);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.serverService.findOne(id);
  }

  @Put(':id')
  async updatee(@Param('id') id: number, @Body() server: Server) {
    this.serverService.update(id, server);
    return `${server}`;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.serverService.delete(id);
    return 'removee test';
  }
}
