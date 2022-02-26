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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 테스트 예시
  it('should be 4', () => {
    // 2 더하기 2가 4와 같기(expect)를 기대(toEqual)한다.
    expect(2 + 2).toEqual(4);
  });
});
