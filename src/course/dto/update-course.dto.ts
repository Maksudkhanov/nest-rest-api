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
  @IsNotEmpty({ message: 'name is empty' })
  @IsString({ message: 'name is not string' })
  @MaxLength(50, { message: 'Maximum length uis 50' })
  @MinLength(2, { message: 'Minumum length is 2' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'description is not string' })
  @MaxLength(200, { message: 'Maximum length uis 200' })
  @MinLength(2, { message: 'Minumum length is 2' })
  description?: string;

  @IsOptional()
  @IsArray()
  advantages?: string[];
}
