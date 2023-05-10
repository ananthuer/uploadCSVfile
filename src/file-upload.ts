import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mkv|xlsx|csv)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name.toString().toLowerCase().replaceAll(" ", "_")}-${randomName}${fileExtName}`);
};

export const imageFileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    
    destination: './images',
    filename: editFileName
  }),
  fileFilter: imageFileFilter
})

export const excelFileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    
    destination: './uploads',
    filename: editFileName
  }),
  fileFilter: imageFileFilter
})