import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @IsString({ message: 'Title is not string' })
  @MaxLength(50, { message: 'Maximum title length is 50' })
  @MinLength(2, { message: 'Minumum title length is 2' })
  title: string;

  @IsString({ message: 'Description is not string' })
  @MaxLength(200, { message: 'Maximum description length uis 200' })
  @MinLength(2, { message: 'Minumum description length is 2' })
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  advantages?: string[];
}
