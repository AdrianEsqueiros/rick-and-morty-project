import { NestFactory } from '@nestjs/core';
import { CharactersModule } from './characters.module';

async function bootstrap() {
  const app = await NestFactory.create(CharactersModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
