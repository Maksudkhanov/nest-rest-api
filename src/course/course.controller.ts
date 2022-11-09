import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { paginateItems } from 'src/utils/paginateItems';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page?: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit?: number,
  ) {
    const results = await this.courseService.getAll();
    const paginatedResults = paginateItems(results, page, limit);
    return paginatedResults;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCourseDto,
  ) {
    return this.courseService.updateById(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteById(id);
  }
}
