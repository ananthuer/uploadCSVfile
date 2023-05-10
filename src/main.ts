import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  //app.use(tokenparser)

  const config = new DocumentBuilder()
  .setTitle('Panel')
  .setDescription('The Panel API description')
  .setVersion('1.0')
  .addApiKey({
    name: 'x-access-token', 
    type: "apiKey",
    in: "header"
  }, 'x-access-token')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.enableCors({
    origin: "*"
  })

  await app.listen(8000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
