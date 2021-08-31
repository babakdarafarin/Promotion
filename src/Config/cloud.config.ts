import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class CloudConfig implements MongooseOptionsFactory{
    constructor(private configService : ConfigService){}
  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
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

