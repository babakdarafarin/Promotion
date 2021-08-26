  import { ClientOptions } from "@elastic/elasticsearch";
import { Injectable } from "@nestjs/common";
  import { ConfigService } from '@nestjs/config'
import { ElasticsearchOptionsFactory } from "@nestjs/elasticsearch";
  import { ClientProvider, ClientsModuleOptionsFactory } from "@nestjs/microservices";

  @Injectable()
  export class CloudConfig implements ElasticsearchOptionsFactory{
      constructor(private configService : ConfigService){}
    
    createElasticsearchOptions(): ClientOptions | Promise<ClientOptions> {
      //change to config.get TODO
      if(process.env.NODE_ENV == 'production')
      {
        return this.configService.get('cloudConnectionInformation')
      }
      else
      {
        return this.configService.get('localConnectionInformation')
      }
    }
  }

