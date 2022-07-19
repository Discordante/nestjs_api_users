import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const defaultDocsPath = '/docs';

export interface SwaggerOptions {
  servers?: string[];
  urlPrefix?: string;
  docsPath?: string;
}

export const setupSwagger = (
  app: INestApplication,
  options?: SwaggerOptions,
) => {
  const config = new DocumentBuilder()
    .setTitle('Base nest project')
    .setDescription('Incredibly detailed description of how the api works')
    .setVersion('0.0.1')

  options?.servers?.forEach((s) => config.addServer(s));

  const urlPrefix = options?.urlPrefix || '';
  let docsPath = options?.docsPath || defaultDocsPath;

  if (!docsPath.startsWith('/')) {
    docsPath = '/' + docsPath;
  }

  config.build();
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(`${urlPrefix}${docsPath}`, app, document);
};
