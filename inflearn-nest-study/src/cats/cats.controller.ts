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
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveint.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { SuccesseInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccesseInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'getcat';
  }

  @Post()
  async signUp() {
    return 'signUp';
  }

  @Post('/login')
  logIn() {
    return 'create Cat';
  }

  @Post('/logout')
  logOut() {
    return 'put cat';
  }

  @Post('/upload/cats')
  uploadCatImg() {
    return 'patch cat';
  }

  @Delete('/:id')
  deleteCat(@Param() param) {
    return 'delete cat';
  }
}
