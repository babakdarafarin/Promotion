import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserGroupSchema } from '../../../models/user-group.model'
import { ProductGroupSchema } from '../../../models/product-group.model'
import { PricingStrategySchema } from '../../../models/pricing-strategy.model'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { RegionSchema } from '../../../models/region.model'
import { RegionGroupSchema } from '../../../models/region-group.model'

@Module({
    imports: 
            [
                MongooseModule.forFeature([{name: 'UserGroup', schema: UserGroupSchema}]),
                MongooseModule.forFeature([{name: 'ProductGroup', schema: ProductGroupSchema}]),
                MongooseModule.forFeature([{name: 'PricingStrategy', schema: PricingStrategySchema}]),
                MongooseModule.forFeature([{name: 'Region', schema: RegionSchema}]),
                MongooseModule.forFeature([{name: 'RegionGroup', schema: RegionGroupSchema}])
            ],
    controllers: [CommonController],
    providers: [CommonService]
  })

export class CommonModule {}