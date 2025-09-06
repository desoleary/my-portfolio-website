import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ bodyLimit: 10 * 1024 * 1024 }), // 10mb
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT || 4000);
  // eslint-disable-next-line no-console
  console.log(`API ready on http://localhost:${process.env.PORT || 4000}/graphql`);
}
bootstrap();
