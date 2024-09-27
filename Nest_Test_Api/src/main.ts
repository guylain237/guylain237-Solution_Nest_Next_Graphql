import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const origin = configService.get<string>('ORIGIN_URL_FRONT');
  const port = configService.get<number>('APP_PORT') || 3000;
  // configuration de l'origine pour le CORS
  app.enableCors({
    origin: origin,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
