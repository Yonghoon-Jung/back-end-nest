// DTO : 데이터 전송 객체(data transfer object)
// dto를 사용함으로써 코드를 더욱 간결하게 만들 수 있다.
import { IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // each는 모든 요소를 검사
  @IsString({ each: true })
  readonly genres: string[];
}
