import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeIdentitySchema } from '../../../models/discount-code-identity.model';
import { UserGroupSchema } from '../../../models/user-group.model';
import { ProductGroupSchema } from '../../../models/product-group.model';
import { PricingStrategySchema } from '../../../models/pricing-strategy.model';
import { DiscountCodeSummarySchema } from '../../../models/discount-code-summary.model';
import { DiscountCodeController } from './discount-code.controller'

@Module({
  imports: 
          [
              MongooseModule.forFeature([{name: 'DiscountCodeIdentity', schema: DiscountCodeIdentitySchema}]),
              MongooseModule.forFeature([{name: 'UserGroup', schema: UserGroupSchema}]),
              MongooseModule.forFeature([{name: 'ProductGroup', schema: ProductGroupSchema}]),
              MongooseModule.forFeature([{name: 'PricingStrategy', schema: PricingStrategySchema}]),
              MongooseModule.forFeature([{name: 'DiscountCodeSummary', schema: DiscountCodeSummarySchema}])
          ],
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService]
})
export class DiscountCodeModule {}
