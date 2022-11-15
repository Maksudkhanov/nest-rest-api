import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createWriteStream } from 'fs';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './file.model';
import { access, mkdir } from 'fs/promises';

@Injectable()
export class FileService {
  constructor(@InjectModel(File) private fileRepository: typeof File) {}

  async create(
    dto: CreateFileDto,
    file: Express.Multer.File,
  ): Promise<File | HttpException> {
    if (!access('files')) {
      mkdir('files');
    }

    const fileInfo: Pick<File, 'title' | 'size' | 'path' | 'type'> = {
      title: dto.title,
      size: Number((file.size / (1000 * 1000)).toFixed(2)),
      path: `files/${dto.title}`,
      type: file.mimetype,
    };

    const result: File | HttpException = await this.fileRepository
      .create(fileInfo)
      .then((data): File => {
        writeFileToFolder(fileInfo.path, file);
        return data;
      })
      .catch((reason: any): HttpException => {
        let message: string = reason.errors[0].message;
        if (message === 'title must be unique') {
          message = 'File with such title already exists';
        }
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      });

    return result;
  }
}

async function writeFileToFolder(filepath: string, file: Express.Multer.File) {
  const writer = createWriteStream(filepath);
  writer.write(file.buffer.toString());
}
