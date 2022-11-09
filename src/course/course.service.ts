import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseRepository: typeof Course) {}

  async create(dto: CreateCourseDto) {
    return this.courseRepository.create(dto).catch((reason: any) => {
      throw new HttpException(reason.errors[0].message, HttpStatus.BAD_REQUEST);
    });
  }

  async getById(id: number) {
    return this.courseRepository
      .findByPk(id, {
        attributes: ['id', 'name', 'description'],
      })
      .catch((reason: any) => {
        throw new HttpException(
          reason.errors[0].message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async deleteById(id: number) {
    return this.courseRepository
      .findByPk(id)
      .then(async (result) => {
        return this.courseRepository.destroy({ where: { id } }).then(() => {
          return result;
        });
      })
      .catch((reason: any) => {
        throw new HttpException(
          reason.errors[0].message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async updateById(id: number, dto: CreateCourseDto) {
    return this.courseRepository
      .update(
        {
          title: dto.title,
          description: dto.description,
        },
        {
          where: { id },
          returning: true,
        },
      )
      .then((result) => {
        return result[1][0];
      })
      .catch((reason: any) => {
        throw new HttpException(
          reason.errors[0].message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async getAll() {
    return this.courseRepository.findAll().catch((reason: any) => {
      throw new HttpException(reason.errors[0].message, HttpStatus.BAD_REQUEST);
    });
  }
}
