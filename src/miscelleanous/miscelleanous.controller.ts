import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { MiscelleanousService } from './miscelleanous.service';
import { CreateMiscelleanousDto } from './dto/create-miscelleanous.dto';
import { UpdateMiscelleanousDto } from './dto/update-miscelleanous.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { excelFileInterceptor } from 'src/file-upload';
import Multer from 'multer';

@Controller('miscelleanous')
export class MiscelleanousController {
  constructor(private readonly miscelleanousService: MiscelleanousService) {}

  @Post('/upload-CSV-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(excelFileInterceptor)
  create(@UploadedFile( new ParseFilePipe({
    validators: [
      // new MaxFileSizeValidator({ maxSize: 100000 }),
      // new FileTypeValidator({ fileType: 'cnv'||'xlsx' }),
    ]
  })) file:Express.Multer.File) {
    return this.miscelleanousService.create(file.filename);
  }

 
}
