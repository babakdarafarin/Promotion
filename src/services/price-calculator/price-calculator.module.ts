import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PriceCalculatorService } from './price-calculator.service';
import { PriceCalculatorController } from './price-calculator.controller';
import { CampaignSummarySchema } from '../../../models/campaign-summary.model'
import { UserGroupSchema } from '../../../models/user-group.model';
import { ProductGroupSchema } from '../../../models/product-group.model';
import { PricingStrategySchema } from '../../../models/pricing-strategy.model'
import { DiscountCodeSummarySchema } from '../../../models/discount-code-summary.model'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'CampaignSummary', schema: CampaignSummarySchema}]),
    MongooseModule.forFeature([{name: 'UserGroup', schema: UserGroupSchema}]),
    MongooseModule.forFeature([{name: 'ProductGroup', schema: ProductGroupSchema}]),
    MongooseModule.forFeature([{name: 'PricingStrategy', schema: PricingStrategySchema}]),
    MongooseModule.forFeature([{name: 'DiscountCodeSummary', schema: DiscountCodeSummarySchema}])
  ],
  providers: [PriceCalculatorService],
  controllers: [PriceCalculatorController]
})
export class PriceCalculatorModule {}
