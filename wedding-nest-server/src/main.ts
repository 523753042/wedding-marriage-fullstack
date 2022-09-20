import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor())
  app.enableCors()
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(3000);

}
bootstrap();
