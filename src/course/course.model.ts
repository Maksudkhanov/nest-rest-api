import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ICourse } from './course.interface';

@Table({ tableName: 'course' })
export class Course extends Model<Course, ICourse> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.CHAR,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column(DataType.CHAR)
  description: string;

  @Column(DataType.ARRAY(DataType.CHAR))
  advantages: string[];
}
