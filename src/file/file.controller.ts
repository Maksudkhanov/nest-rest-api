import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {} from 'fs/promises';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './file.model';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<File | HttpException> {
    if (!file) {
      throw new HttpException('Provide file', HttpStatus.BAD_REQUEST);
    }

    return this.fileService.create(dto, file);
  }

  // @Get('/:id')
  // getFile(@Res() res: Response) {
  //   const file = createReadStream();
  //   res.contentType('appication/mp4');
  //   file.pipe(res);
  // }
}
