import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { config } from './Config/config';
import { CloudConfig } from './Config/cloud.config'

let ENV = process.argv[2] ? process.argv[2] : process.env.NODE_ENV

//inject config service and change process.env to config class TODO
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `environments/.env.${ENV}`,
      isGlobal:true,
      load: [config]
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useClass: CloudConfig,
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
