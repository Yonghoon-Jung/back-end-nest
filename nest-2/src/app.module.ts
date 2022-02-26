import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

/*
nestjs는 express 위에서 돌아간다.
그래서 컨트롤러에서 request, response 객체를 사용할 수 있다.
하지만 req, res 객체를 직접적으로 사용하는 것은 좋지 못하다.
왜냐면 nestjs는 두개의 프레임워크랑 동작하기 때문이다.
기본적으로 express 위에서 동작하지만 이걸 Fastify로 전환할 수도 있다.
Fastify는 express랑 비슷한 동작을 하지만 속도는 훨씬 빠르다.
중요한건 Fastify와 express가 동시에 동작하기 때문에 express Req,Res 객체를 많이 사용하지 않는 게 중요하다.
express와 Fastify를 전환하는 것은 nestjs가 알아서 해줄 것이다.

dependency injection
movies.controller에서 getAll이 작동하는 이유는
movies.service라는 프로퍼티를 만들고 타입을 지정해줘서이다.
즉, movies.module을 보면 controller와 provider를 임포트하고 있는데
여기서 이 provider가 모든 것들을 동작시켜 타입만 지정해줘도 동작하는 것이다.
그래서 provider를 임포트하고 controller에 주입하는 것이 dependency injection이다.
*/
