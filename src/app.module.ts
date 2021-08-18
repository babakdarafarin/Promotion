import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch'

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({

      envFilePath: !ENV ? '.env' : `Environments/.env.${ENV}`,
      isGlobal:true
    }),
    ElasticsearchModule.register({
      node: process.env.ELK_NODE,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
