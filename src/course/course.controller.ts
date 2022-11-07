import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @HttpCode(HttpStatus.FOUND)
  @Get('/:id')
  get(@Param('id') id: string) {
    const pk = Number(id);
    return this.courseService.getById(pk);
  }
}
