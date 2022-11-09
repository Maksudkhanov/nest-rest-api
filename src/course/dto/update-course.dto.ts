import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title is empty' })
  @IsString({ message: 'Title is not string' })
  @MaxLength(50, { message: 'Maximum length is 50' })
  @MinLength(2, { message: 'Minumum length is 2' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description is not string' })
  @MaxLength(200, { message: 'Maximum description length uis 200' })
  @MinLength(2, { message: 'Minumum description length is 2' })
  description?: string;

  @IsOptional()
  @IsArray()
  advantages?: string[];
}
