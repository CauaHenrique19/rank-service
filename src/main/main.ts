import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { RankServiceModule } from './rank-service.module';
import { CONFIG } from '@rank-service/config';

async function bootstrap() {
  const app = await NestFactory.create(RankServiceModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      run: {
        autoCommit: false,
      },
      client: {
        clientId: CONFIG.SERVICE_NAME,
        brokers: [CONFIG.KAFKA_BROKER_HOST],
      },
      consumer: {
        groupId: CONFIG.SERVICE_NAME,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(CONFIG.PORT);
}
bootstrap();
