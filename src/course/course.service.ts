import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseRepository: typeof Course) {}

  async create(dto: CreateCourseDto) {
    return this.courseRepository.create(dto, {
      returning: ['id', 'name', 'description'],
    });
  }

  async getById(id: number) {
    return this.courseRepository.findByPk(id, {
      attributes: ['id', 'name', 'description'],
    });
  }
}
