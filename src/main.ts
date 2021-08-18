import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from '../Filters/RPCExceptionFilter';
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'rail',
      queueOptions: {
        durable: false
      },
    },
  });

  app.useGlobalFilters(new ExceptionFilter());
  
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  
  app.listen()
}
bootstrap(); 



