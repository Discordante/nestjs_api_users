import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const urlPrefix = configService.get<string>('APP_PREFIX', '');
  const docsPath = configService.get<string>('SWAGGER_PATH');

  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(urlPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app, { urlPrefix, docsPath });

  const port = configService.get('APP_PORT', '3000');

  await app.listen(port);
  new Logger('Init').log(`- Running. Listening on port ${port}`);
  new Logger('Init').log(
    `- Documentation: ${await app.getUrl()}${urlPrefix}${docsPath}`,
  );
}
bootstrap();
