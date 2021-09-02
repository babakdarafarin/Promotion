import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';
import { CloudConfig } from './config/cloud.config'
import { CommonModule } from './services/common/common.module';
import { CampaignModule } from './services/campaign/campaign.module';
import { DiscountCodeModule } from './services/discount-code/discount-code.module';
import { PriceCalculatorModule } from './services/price-calculator/price-calculator.module';
import { ReferralCodeModule } from './services/referral-code/referral-code.module';
import { UserModule } from './services/user/user.module';

let ENV = process.argv[2] ? process.argv[2] : process.env.NODE_ENV

//inject config service and change process.env to config class TODO
@Module({
  imports: [
    CampaignModule,
    CommonModule,
    DiscountCodeModule,
    PriceCalculatorModule,
    ReferralCodeModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `environments/.env.${ENV}`,
      isGlobal:true,
      load: [config]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: CloudConfig,
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



