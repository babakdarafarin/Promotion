import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { config } from './config';
import { CloudConfig } from './cloud.config'

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `Environments/.env.${ENV}`,
      isGlobal:true,
      load: [config]
    }),
    ElasticsearchModule.register
      ({        
        node: process.env.ELK_NODE,
        cloud: {
          id: 'DoctorSearchEngine:dXMtd2VzdDEuZ2NwLmNsb3VkLmVzLmlvJDZkNmNmZDVjZDQyOTRjYmFiNzM3YTI2M2Y3NTVjZDJmJGIwZWM5MTNlY2Y3YzQ1ZDQ5YWMyZGNlZjdkYzQ4MGY4'
        },
        auth: {
            username: "elastic",
            password: "7sMQEDQPcCwLwwUvZVxe7ZIt",
        },
      }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
