import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFileDto {
  @IsString({ message: 'Title is not string' })
  @IsNotEmpty({ message: 'Title is empty' })
  @MinLength(2, { message: 'Minumum title length is 2' })
  @MaxLength(50, { message: 'Maximum title length is 50' })
  title: string;
}
