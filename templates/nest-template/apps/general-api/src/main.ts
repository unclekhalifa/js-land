import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { generateOpenApi } from '@ts-rest/open-api'
import { contract } from '@nest-template/contracts'
import { SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = generateOpenApi(contract, {
    info: {
      title: 'General API',
      version: '0.0.0'
    }
  });

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
