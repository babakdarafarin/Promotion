  import { Injectable } from "@nestjs/common";
  import { ConfigService } from '@nestjs/config'
  import { ClientProvider, ClientsModuleOptionsFactory } from "@nestjs/microservices";

  @Injectable()
  export class CloudConfig implements ClientsModuleOptionsFactory{
      constructor(private configService : ConfigService){}
      
      
      createClientOptions(): ClientProvider | Promise<ClientProvider> {
        return this.configService.get('connectionInformation')
      }
  }

