import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // 테스트를 할 때마다 어플리케이션을 만들고 싶지 않으면 beforeEach -> beforeAll로 변경
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // e2e 테스트에서는 main.ts에서 적용했던 transform이 적용되지 않아 에러가 뜸.
    // 항상 이 점을 인지하고 e2e 또는 유닛 테스트를 수행해야 함
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('welcome');
  });

  // 테스팅 데이터베이스와 메인 데이터베이스를 나눠서 가지고 있어야 함.
  // 테스트는 경우의 수가 많기 때문에 사소한 부분이라도 놓치지 않고 작성하는 게 좋다.
  // ex : 삭제가 된 경우와 삭제하려는 파라미터 값이 없을 경우,
  //      생성하려는 데이터와 타입이 일치하지 않는 데이터 등 모든 경우의 수
  describe('/movies', () => {
    it('GET', () => {
      // request는 슈퍼테스트에서 가져와서 쓰는 것이고,
      // getHttpServer는 localhost:3000 처럼 작성하지 않으려고 쓰는 것임
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          genres: ['test'],
          year: 2000,
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          genres: ['test'],
          year: 2000,
          other: 'thing',
        })
        .expect(400);
    });

    // delete는 method not allowed가 아닌 not found 404를 받는다.
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    // nestjs에서 it.todo라는 기능을 제공한다. 해야 할 일을 메모?하는 기능
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    // 삭제 테스트를 먼저 수행하면 남아있는 데이터가 없기에 업데이트 테스트 우선 작성
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'update test', genres: ['update test'], year: 2020 })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
