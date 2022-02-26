import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// nestjs에서 제공하는 부분 타입 사용 npm i @nestjs/mapped-types 설치
// PartialType은 베이스 타입이 필요하기에 매개변수로 CreateMovieDto를 넣어준다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// import { IsString, IsNumber } from 'class-validator';
// 타입을 지정할 때 '?'를 통해 선택적으로 바꿔준다.
// 일반적인 설정
// @IsString()
// readonly title?: string;

// @IsNumber()
// readonly year?: number;

// // each는 모든 요소를 검사
// @IsString({ each: true })
// readonly genres?: string[];
