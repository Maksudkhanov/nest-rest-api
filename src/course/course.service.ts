import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseRepository: typeof Course) {}

  async create(dto: CreateCourseDto) {
    return this.courseRepository.create(dto);
  }

  async getById(id: number) {
    return this.courseRepository.findByPk(id, {
      attributes: ['id', 'name', 'description'],
    });
  }

  async deleteById(id: number) {
    return this.courseRepository.findByPk(id).then(async (result) => {
      return this.courseRepository.destroy({ where: { id } }).then(() => {
        return result;
      });
    });
  }

  async updateById(id: number, dto: any) {
    return this.courseRepository
      .update(
        {
          name: dto.name,
          description: dto.description,
        },
        {
          where: { id },
          returning: true,
        },
      )
      .then((result) => {
        return result[1][0];
      });
  }

  async getAll() {
    return this.courseRepository.findAll();
  }
}
