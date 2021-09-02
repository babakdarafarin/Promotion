import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { DiscountCodeIdentity } from '../../../models/discount-code-identity.model'
import { UserGroup } from '../../../models/user-group.model'
import { ProductGroup } from '../../../models/product-group.model'
import { PricingStrategy } from '../../../models/pricing-strategy.model'
import { DiscountCodeSummary } from '../../../models/discount-code-summary.model';
import { DiscountCodeDto } from './Dtos/discount-code.dto';
import { CustomResponse } from 'src/response/custom-response';

@Injectable()
export class DiscountCodeService {
    constructor(
        @InjectModel('DiscountCodeIdentity') private readonly discountCodeIdentityModel: Model<DiscountCodeIdentity>,
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('DiscountCodeSummary') private readonly discountCodeSummaryModel: Model<DiscountCodeSummary>,
    ){}

    async AddDiscountCode(discountcode: DiscountCodeDto) : Promise<CustomResponse> {

        //add discount identity, 
        const newDiscountCode = new this.discountCodeIdentityModel({
            code: discountcode.identity.code,
            description: discountcode.identity.description,
            startDate: new Date(discountcode.identity.startDate),
            endDate: new Date(discountcode.identity.endDate),
        })
        await newDiscountCode.save()

        //add customer group
        const newUserGroup = new this.userGroupModel({
            name: discountcode.customerGroup.name,
            description: discountcode.customerGroup.description,
            userIds: discountcode.customerGroup.userIds
        })
        await newUserGroup.save()

        //add product group
        const newProductGroup = new this.productGroupModel({
            name: discountcode.productGroup.name,
            description: discountcode.productGroup.description,
            productIds: discountcode.productGroup.productIds
        })
        await newProductGroup.save()

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
        await newPricingStrategy.save()

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
        await newDiscountSummary.save()

        return new CustomResponse(
            'Discount Code Created!',
            true,
            await newDiscountSummary.id
        )
    }

    async GetDiscountCodesSummaries() : Promise<CustomResponse> {
        return new CustomResponse(
            'Discount Code Summaries Listed!',
            true,
            await this.discountCodeSummaryModel.find( { isDeleted : false } )
        )
    }
        
    //convert to union TODO - SingleQuery
    //join on groups, 
    async GetDiscountCodeDetails(discountCodeSummaryId: string) : Promise<CustomResponse> {
        const discountCodeSummary: DiscountCodeSummary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)
        
        if(!discountCodeSummary || discountCodeSummary.isDeleted){
            return new CustomResponse(
                'Target Discount Code Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
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

            return new CustomResponse(
                'Target Discount Code\'s Details Listed!',
                true,
                discountCode
            )
        }
    }

    async ChangeActivity(discountCodeSummaryId: string) : Promise<CustomResponse> {
        const discountCodeSummary: DiscountCodeSummary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)
        
        if(!discountCodeSummary || discountCodeSummary.isDeleted){
            return new CustomResponse(
                'Target Discount Code Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
            discountCodeSummary.isActive = !discountCodeSummary.isActive
            await discountCodeSummary.save()

            return new CustomResponse(
                'Discount Code\'s Activity Status Changed!',
                true,
                {
                    activityStatus : discountCodeSummary.isActive
                }
            )
        }
    }

    async RemoveDiscountCode(discountCodeSummaryId: string) : Promise<CustomResponse> {
        const discountCodeSummary: DiscountCodeSummary = await this.discountCodeSummaryModel.findById(discountCodeSummaryId)

        if(!discountCodeSummary || discountCodeSummary.isDeleted){
            return new CustomResponse(
                'Target Discount Code Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
            discountCodeSummary.isDeleted = true
            discountCodeSummary.isActive = false
            await discountCodeSummary.save()

            return new CustomResponse(
                'Target Discount Code Is Deleted!',
                true,
                {}
            )
        }
    }
}
