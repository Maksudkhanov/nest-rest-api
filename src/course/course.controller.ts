import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { IPaginatedItems, paginateItems } from '../utils/paginateItems';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCourseDto): Promise<Course | HttpException> {
    return this.courseService.create(dto);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query(
      'page',
      new DefaultValuePipe(1),
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    page?: number,
    @Query(
      'limit',
      new DefaultValuePipe(5),
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit?: number,
  ): Promise<IPaginatedItems | HttpException> {
    const results = await this.courseService.getAll();
    if (results instanceof HttpException) {
      return results;
    }
    const paginatedResults = paginateItems(results, page, limit);
    return paginatedResults;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Course | HttpException> {
    return this.courseService.getById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() dto: CreateCourseDto,
  ): Promise<Course | HttpException> {
    return this.courseService.updateById(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Course | HttpException> {
    return this.courseService.deleteById(id);
  }
}
