import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// describe는 영어로 말하다의 뜻을 가지는데 테스팅을 뜻함
describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트하기 전에 실행되는 함수
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  /* 
  beforeEach 말고도 afterEach, afterAll, beforeAll이 있다.
  예시로 afterAll() 안에는 데이터 베이스를 깨끗하게 모두 지워주는 함수를 넣을 수 있다.
  */

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should be return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie ID: 999 Not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'update test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update test');
    });

    it('should throw NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

/*
이 코드는 테스트 전에 실행되는 함수에서 작성해도 된다. 
service.create({
  title: 'test movie',
  genres: ['test'],
  year: 2000,
});
*/

// // 테스트 예시
// it('should be 4', () => {
//   // 2 더하기 2가 4와 같기(expect)를 기대(toEqual)한다.
//   expect(2 + 2).toEqual(4);
// });
