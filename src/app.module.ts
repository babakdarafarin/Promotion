import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { join } from 'path';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({

      envFilePath: process.env.APP_ENV === 'dev' ?
      join(process.cwd(), 'environment', 'dev.env') :
      join(process.cwd(), 'environment', 'prod.env'),


      isGlobal:true
    }),
    ElasticsearchModule.register({
      node: process.env.ELK_NODE,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
