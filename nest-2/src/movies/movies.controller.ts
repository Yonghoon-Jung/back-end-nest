import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `this id = ${movieId}`;
  }

  @Post()
  create() {
    return 'create movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `delete movie id = ${movieId}`;
  }

  // Put은 모든 리소스를 업데이트해주는데 Patch는 일부 리소스만 업데이트를 해줌
  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `update movie id = ${movieId}`;
  }
}
