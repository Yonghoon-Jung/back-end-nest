import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get('/:id')
  getOneCat(@Param() param) {
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
