import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  get(@Param('id') id: string) {
    const pk = Number(id);
    return this.courseService.getById(pk);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateCourseDto) {
    const pk = Number(id);
    return this.courseService.updateById(pk, dto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    const pk = Number(id);
    return this.courseService.deleteById(pk);
  }
}
