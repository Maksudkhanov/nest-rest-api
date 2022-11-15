import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IFile } from './file.interface';

@Table({ tableName: 'file' })
export class File extends Model<File, IFile> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.CHAR,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  path: string;

  @Column({
    type: DataType.CHAR,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.REAL,
    allowNull: false,
  })
  size: number;
}
