import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBoard(): string {
    return '여기는 보드입니다.';
  }
}
