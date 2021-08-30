require('dotenv').config(); //delete env usage, TODO
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from '../filters/RPCExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL], //delete use config service TODO
      queue: process.env.RMQ_QUEUE, //delete
      queueOptions: {
        durable: false
      },
    },
  });

  app.useGlobalFilters(new ExceptionFilter());
  
  app.listen()
}

bootstrap(); 



