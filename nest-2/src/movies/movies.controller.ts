import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'movies';
  }

  // search가 /:id 요청보다 아래 있으면 /:id 요청이 실행되니 유의해야 함
  @Get('search')
  search(@Query('year') searchYear: string) {
    return `we are search movie ${searchYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `this id = ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `delete movie id = ${movieId}`;
  }

  // Put은 모든 리소스를 업데이트해주는데 Patch는 일부 리소스만 업데이트를 해줌
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
