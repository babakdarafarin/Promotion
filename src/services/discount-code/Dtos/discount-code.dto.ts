import { DiscountCodeIdentity } from "../../../../models/discount-code-identity.model"
import { PricingStrategy } from "../../../../models/pricing-strategy.model"
import { ProductGroup } from "../../../../models/product-group.model"
import { UserGroup } from "../../../../models/user-group.model"

export class DiscountCodeDto {
    public identity : DiscountCodeIdentity
    public customerGroup: UserGroup
    public productGroup: ProductGroup
    public pricingStrategy: PricingStrategy
}

// export interface CampaignDto {
//     identity : CampaignIdentity
//     customerGroups: UserGroup[] 
//     productGroups: ProductGroup[]
//     pricingStrategies: PricingStrategy[]
//     messagingStrategies: MessagingStrategy[]
// }