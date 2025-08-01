import { NestFactory } from '@nestjs/core';
import { RankServiceModule } from './rank-service.module';
import { CONFIG } from '@rank-service/config';

async function bootstrap() {
  const app = await NestFactory.create(RankServiceModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  await app.listen(CONFIG.PORT);
}
bootstrap();
