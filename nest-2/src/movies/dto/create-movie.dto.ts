// DTO : 데이터 전송 객체(data transfer object)
// dto를 사용함으로써 코드를 더욱 간결하게 만들 수 있다.
// class-validator 라이브러리에는 쩌는 옵션들이 많으니 확인해보자.
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // each는 모든 요소를 검사
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
