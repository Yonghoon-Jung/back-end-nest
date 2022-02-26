import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('welcome');
  });

  // 테스팅 데이터베이스와 메인 데이터베이스를 나눠서 가지고 있어야 함.
  describe('/movies', () => {
    it('GET', () => {
      // request는 슈퍼테스트에서 가져와서 쓰는 것이고,
      // getHttpServer는 localhost:3000 처럼 작성하지 않으려고 쓰는 것임
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          genres: ['test'],
          year: 2000,
        })
        .expect(201);
    });

    // delete는 method not allowed가 아닌 not found 404를 받는다.
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
});
