import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Get('/all')
  getAll() {
    return this.courseService.getAll();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getById(id);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCourseDto) {
    return this.courseService.updateById(id, dto);
  }

  @Delete('/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteById(id);
  }
}
