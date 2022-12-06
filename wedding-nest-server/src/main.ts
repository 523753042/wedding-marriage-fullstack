import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  app
  // app.use(multer)
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'
  });
  await app.listen(3000);

}
bootstrap();
