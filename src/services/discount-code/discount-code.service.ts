import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { DiscountCodeIdentity } from '../../../models/discount-code-identity.model'
import { UserGroup } from '../../../models/user-group.model'
import { ProductGroup } from '../../../models/product-group.model'
import { PricingStrategy } from '../../../models/pricing-strategy.model'
import { DiscountCodeSummary } from '../../../models/discount-code-summary.model';
import { DiscountCodeDto } from './Dtos/discount-code.dto';

@Injectable()
export class DiscountCodeService {
    constructor(
        @InjectModel('DiscountCodeIdentity') private readonly discountCodeIdentityModel: Model<DiscountCodeIdentity>,
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('DiscountCodeSummary') private readonly discountCodeSummaryModel: Model<DiscountCodeSummary>,
    ){}

    async AddDiscountCode(discountcode: DiscountCodeDto){

        //add discount identity, 
        const newDiscountCode = new this.discountCodeIdentityModel({
            code: discountcode.identity.code,
            description: discountcode.identity.description,
            startDate: new Date(discountcode.identity.startDate),
            endDate: new Date(discountcode.identity.endDate),
        })
        newDiscountCode.save()

        //add customer group
        const newUserGroup = new this.userGroupModel({
            name: discountcode.customerGroup.name,
            description: discountcode.customerGroup.description,
            userIds: discountcode.customerGroup.userIds
        })
        newUserGroup.save()

        //add product group
        const newProductGroup = new this.productGroupModel({
            name: discountcode.productGroup.name,
            description: discountcode.productGroup.description,
            productIds: discountcode.productGroup.productIds
        })
        newProductGroup.save()

        //add pricing strategy
        const newPricingStrategy = new this.pricingStrategyModel({
            name: discountcode.pricingStrategy.name,
            type: discountcode.pricingStrategy.type,
            value: discountcode.pricingStrategy.value,
            // minPurchasedAmount: discountcode.pricingStrategy.minPurchasedAmount,
            // minPurchasedItems : discountcode.pricingStrategy.minPurchasedItems,
            maxDiscountAmount : discountcode.pricingStrategy.maxDiscountAmount,
            regionGroups : discountcode.pricingStrategy.regionGroups 
        })
        newPricingStrategy.save()

        //add summary in the collection
        const newDiscountSummary = new this.discountCodeSummaryModel({
            code: newDiscountCode.code,
            description: newDiscountCode.description,
            startDate: newDiscountCode.startDate,
            endDate: newDiscountCode.endDate,
            customerGroupId: newUserGroup.id,
            customerGroupName: newUserGroup.name,
            productGroupId: newProductGroup.id,
            productGroupName: newProductGroup.name,
            pricingStrategyId:  newPricingStrategy.id,
            pricingStrategyName:  newPricingStrategy.name,
            identityId: newDiscountCode.id
        })
        newDiscountSummary.save()

        return newDiscountSummary.id
    }

    async GetDiscountCodesSummaries(){
        return await this.discountCodeSummaryModel.find( { isActive : false } )
    }
        
    //convert to union TODO - SingleQuery
    //join on groups, 
    async GetDiscountCodeDetails(discountCodeSummaryId: string)
    {
        const discountCodeSummary: DiscountCodeSummary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)
        const discountCode = new DiscountCodeDto

        discountCode.identity = {} as DiscountCodeIdentity
        
        discountCode.identity.code = discountCodeSummary.code
        discountCode.identity.description = discountCodeSummary.description
        discountCode.identity.startDate = discountCodeSummary.startDate
        discountCode.identity.endDate = discountCodeSummary.endDate

        //convert to join
        discountCode.customerGroup = await this.userGroupModel.findById(discountCodeSummary.customerGroupId)
        discountCode.productGroup = await this.productGroupModel.findById(discountCodeSummary.productGroupId)
        discountCode.pricingStrategy = await this.pricingStrategyModel.findById(discountCodeSummary.pricingStrategyId)

        return discountCode
    }

    async ChangeActivity(discountCodeSummaryId: string)
    {
        const discountCodeSummary: DiscountCodeSummary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)
        
        discountCodeSummary.isActive = !discountCodeSummary.isActive
        await discountCodeSummary.save()

        return true
    }

    async RemoveDiscountCode(discountCodeSummaryId: string){
        const summary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)
        summary.isDeleted = true
        summary.isActive = false
        summary.save()
    }
}
