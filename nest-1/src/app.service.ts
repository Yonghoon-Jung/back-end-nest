import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '가나다라마바사';
  }

  getServer(): string {
    return '여기는 서버입니다.';
  }
}
