import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ICourse } from './interfaces/course.interface';

@Table({ tableName: 'courses' })
export class Course extends Model<Course, ICourse> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column(DataType.CHAR)
  name: string;

  @Column(DataType.CHAR)
  description: string;
}
