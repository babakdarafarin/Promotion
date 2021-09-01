import { CampaignIdentity } from '../../../../models/campaign-identity.model'
import { MessagingStrategy } from '../../../../models/messaging-strategy.model'
import { PricingStrategy } from '../../../../models/pricing-strategy.model'
import { ProductGroup } from '../../../../models/product-group.model'
import { UserGroup } from '../../../../models/user-group.model'

export class CampaignDto {
    public identity : CampaignIdentity
    public customerGroups: UserGroup[] 
    public productGroups: ProductGroup[]
    public pricingStrategy: PricingStrategy
    public messagingStrategies: MessagingStrategy[]
}