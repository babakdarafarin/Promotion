import { ClientOptions } from "@elastic/elasticsearch";
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config'
import { ElasticsearchOptionsFactory } from "@nestjs/elasticsearch";


@Injectable()
export class CloudConfig implements ElasticsearchOptionsFactory{
    constructor(private configService : ConfigService){}
  
  createElasticsearchOptions(): ClientOptions | Promise<ClientOptions> {
    //change to config.get TODO
    let ENV = process.argv[2] ? process.argv[2] : process.env.NODE_ENV
    if(ENV == 'production')
    {
      return this.configService.get('cloudConnectionInformation')
    }
    else
    {
      return this.configService.get('localConnectionInformation')
    }
  }
}

