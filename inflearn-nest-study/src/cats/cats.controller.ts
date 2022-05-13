import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveint.pipe';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get('/:id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create Cat';
  }

  @Put('/:id')
  updateCat(@Param() param) {
    return 'put cat';
  }

  @Patch('/:id')
  updatePartialCat(@Param() param) {
    return 'patch cat';
  }

  @Delete('/:id')
  deleteCat(@Param() param) {
    return 'delete cat';
  }
}
