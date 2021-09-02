import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserGroup } from '../../../models/user-group.model'
import { ProductGroup } from '../../../models/product-group.model'
import { PricingStrategy } from '../../../models/pricing-strategy.model'
import { Region } from '../../../models/region.model'
import { RegionGroup } from '../../../models/region-group.model'
import { RegionGroupDto } from './Dtos/region-group.dto'
import { CustomResponse } from 'src/response/custom-response'

@Injectable()
export class CommonService {
    constructor(
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('Region') private readonly regionModel: Model<Region>,
        @InjectModel('RegionGroup') private readonly regionGroupModel: Model<RegionGroup>
    ){}
    

    async GetUserGroups() : Promise<CustomResponse> {        
        return new CustomResponse(
            'User Groups Listed!',
            true,
            await this.userGroupModel.find()
        )
    }

    //soft remove? TODO
    async RemoveUserGroup(userGroupId: string) : Promise<CustomResponse> {
        await this.userGroupModel.findByIdAndDelete(userGroupId)
        return new CustomResponse(
            'User Group Removed!',
            true,
            {}
        )
    }

    async GetProductGroups() : Promise<CustomResponse> {
        return new CustomResponse(
            'Product Groups Listed!',
            true,
            await this.productGroupModel.find()
        )
    }

    async RemoveProductGroup(productGroupId: string) : Promise<CustomResponse> {
        await this.productGroupModel.findByIdAndDelete(productGroupId)
        return new CustomResponse(
            'Product Group Removed!',
            true,
            {}
        )
    }

    async GetPricingStrategies() : Promise<CustomResponse> {
        return new CustomResponse(
            'Pricing Strategies Listed!',
            true,
            await this.pricingStrategyModel.find()
        )
    }

    async RemovePricingStrategy(pricingStrategyId: string) : Promise<CustomResponse> {
        await this.pricingStrategyModel.findByIdAndRemove(pricingStrategyId)
        return new CustomResponse(
            'Pricing Strategy Removed!',
            true,
            {}
        )
    }

    async GetRegions() : Promise<CustomResponse> {
        return new CustomResponse(
            'Regions Listed!',
            true,
            await this.regionModel.find()
        )
    }

    async CreateRegionGroup(regionGroup : RegionGroupDto) : Promise<CustomResponse> {
        const newRegionGroup = new this.regionGroupModel({
            name: regionGroup.name,
            regionsList : regionGroup.regionsList
        })
        await newRegionGroup.save()
        
        return new CustomResponse(
            'Region Group Created!',
            true,
            newRegionGroup.id
        )
    }

    async GetRegionGroups() : Promise<CustomResponse> {
        return new CustomResponse(
            'Region Groups Listed!',
            true,
            await this.regionGroupModel.find()
        )
    }

    async RemoveRegionGroup(regionGroupId: string) : Promise<CustomResponse> {
        await this.regionGroupModel.findByIdAndRemove(regionGroupId)
        return new CustomResponse(
            'Region Group Deleted!',
            true,
            {}
        )
    }
}
