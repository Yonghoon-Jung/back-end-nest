import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
    유효성 검사용 파이프를 생성, 미들웨어라고 생각할 수도 있음
    ValidationPipe가 데이터 유효성을 검사해줌
    npm i class-validator class-transformer 설치해야 함
    Validator는 다양한 옵션을 가지고 있는데 그중 하나인 whitelist는
    아무 데코레이터도 없는 프로퍼티의 오브젝트를 거름
    누군가가 아예 이상한 걸 보내면 막는 옵션도 있음
    forbidNonWhitelisted를 true로 설정해주면 됨(에러메시지에 존재해서는 안되는 프로퍼티라고 추가됨)
    어떤 url이든 문자열 형식으로 받아와서 숫자형으로 바꿔줘야함
    그래서 설정하는 옵션중 하나가 transfrom임
    유저가 보낸 요청을 우리가 원하는 타입으로 바꿔줌
    즉 파라미터로 받는 값을 스트링으로만 받을 수 있었다면 이제는 넘버로 작성해도 문제가 안됨
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
