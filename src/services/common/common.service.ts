import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserGroup } from '../../../models/user-group.model'
import { ProductGroup } from '../../../models/product-group.model'
import { PricingStrategy } from '../../../models/pricing-strategy.model'
import { Region } from '../../../models/region.model'
import { RegionGroup } from '../../../models/region-group.model'
import { RegionGroupDto } from './Dtos/region-group.dto'

@Injectable()
export class CommonService {
    constructor(
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('Region') private readonly regionModel: Model<Region>,
        @InjectModel('RegionGroup') private readonly regionGroupModel: Model<RegionGroup>
    ){}
    

    async GetUserGroups()
    {
        return await this.userGroupModel.find()
    }

    async RemoveUserGroup(userGroupId: string){
        await this.userGroupModel.findByIdAndDelete(userGroupId)
    }

    async GetProductGroups()
    {
        return await this.productGroupModel.find()
    }

    async RemoveProductGroup(productGroupId: string){
        await this.productGroupModel.findByIdAndDelete(productGroupId)
    }

    async GetPricingStrategies()
    {
        return await this.pricingStrategyModel.find()
    }

    async RemovePricingStrategy(pricingStrategyId: string){
        return await this.pricingStrategyModel.findByIdAndRemove(pricingStrategyId)
    }

    async GetRegions()
    {
        return await this.regionModel.find()
    }

    async GetRegionGroups()
    {
        return await this.regionGroupModel.find()
    }

    async CreateRegionGroup(regionGroup : RegionGroupDto)
    {
        const newRegionGroup = new this.regionGroupModel({
            name: regionGroup.name,
            regionsList : regionGroup.regionsList
        })
        newRegionGroup.save()
        
        return newRegionGroup.id
    }

    async RemoveRegionGroup(regionGroupId: string){
        return this.regionGroupModel.findByIdAndRemove(regionGroupId)
    }
}
