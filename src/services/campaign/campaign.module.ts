import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { MongooseModule } from "@nestjs/mongoose";
import { CampaignIdentitySchema } from '../../../models/campaign-identity.model';
import { UserGroupSchema } from '../../../models/user-group.model';
import { ProductGroupSchema } from '../../../models/product-group.model';
import { PricingStrategySchema } from '../../../models/pricing-strategy.model';
import { MessagingStrategySchema } from '../../../models/messaging-strategy.model';
import { CampaignSummarySchema } from '../../../models/campaign-summary.model';
import { CampaignController } from './campaign.controller';

@Module({
  imports: 
          [
              MongooseModule.forFeature([{name: 'CampaignIdentity', schema: CampaignIdentitySchema}]),
              MongooseModule.forFeature([{name: 'UserGroup', schema: UserGroupSchema}]),
              MongooseModule.forFeature([{name: 'ProductGroup', schema: ProductGroupSchema}]),
              MongooseModule.forFeature([{name: 'PricingStrategy', schema: PricingStrategySchema}]),
              MongooseModule.forFeature([{name: 'MessagingStrategy', schema: MessagingStrategySchema}]),
              MongooseModule.forFeature([{name: 'CampaignSummary', schema: CampaignSummarySchema}])
          ],
  controllers: [CampaignController],
  providers: [CampaignService]
})
export class CampaignModule {}
