import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MiscelleanousModule } from './miscelleanous/miscelleanous.module';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { join } from 'path';
@Module({
  imports: [ MiscelleanousModule, MulterModule.registerAsync({
    useFactory: () => ({
      dest: './exports',
    }),
    
  }) ,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'exports'),
    serveRoot: '/exports',
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
