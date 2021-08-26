import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { config } from './config';
import { CloudConfig } from './cloud.config'

const ENV = process.env.NODE_ENV;

//inject config service and change process.env to config class TODO
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
          id: process.env.ELK_CLOUD_ID
        },
        auth: {
            username: process.env.ELK_CLOUD_USERNAME,
            password: process.env.ELK_CLOUD_PASSWORD,
        },
      }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
