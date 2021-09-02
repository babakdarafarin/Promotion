import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { PriceCalculatorDto } from './Dtos/price-calculator.dto'
import { CampaignSummary } from '../../../models/campaign-summary.model'
import { UserGroup } from '../../../models/user-group.model'
import { ProductGroup } from '../../../models/product-group.model'
import { PricingStrategy } from '../../../models/pricing-strategy.model';
import { DiscountCodeSummary } from '../../../models/discount-code-summary.model'
import { CustomResponse } from 'src/response/custom-response'


@Injectable()
export class PriceCalculatorService {
    constructor(
        @InjectModel('CampaignSummary') private readonly campaignSummaryModel: Model<CampaignSummary>,
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('DiscountCodeSummary') private readonly discountCodeSummaryModel: Model<DiscountCodeSummary>,
    ){}

    async CalculateReducedPrices(ToBeCalculated: PriceCalculatorDto[]) : Promise<CustomResponse> {

        for(let tempEntry of ToBeCalculated)
        {
            tempEntry.reducedPrice = await this.Calculator(
                tempEntry.userId, 
                tempEntry.productId, 
                tempEntry.price, 
                tempEntry.discountCode
                )    
        }

        return new CustomResponse(
            'Reduced Prices Calculated!',
            true,
            ToBeCalculated
        )
    }

    //Test!!!!!
    //Combinning discount codes
    //can the reduced price be zero?
    private async Calculator(userId: string, productId: string, price: number, discountCode?: string): Promise<number>{

        let reducedPrice = price
        let campaignTotalDiscountAmount = 0
        let discountCodeTotalDiscountAmount = 0
        const date = new Date()
        
        //First, check if any active campaign affect the price
        const activeCampaignSummary = await this.campaignSummaryModel.findOne( { isActive : true } )
        
        if(activeCampaignSummary)
        {   
            
            //Check if date lmits
            if( date >= activeCampaignSummary.startDate && date <= activeCampaignSummary.endDate)
            {
                //console.log('date ok')
                //Check if user can use campaign discounts
                const targetUserGroups : UserGroup[] = await this.userGroupModel.find({ _id: { $in: activeCampaignSummary.customerGroupsIds }})

                let userMembership = false
                for(let i = 0; i < targetUserGroups.length; i ++){
                    if(targetUserGroups[i].userIds.includes(userId)){
                        userMembership = true
                        break
                    }
                }

                if(userMembership)
                {
                    //console.log('user ok')
                    //Check if product can be affected by the campaign pricing rules
                    const targetProductGroups : ProductGroup[] = await this.productGroupModel.find({ _id: { $in: activeCampaignSummary.productGroupsIds }})

                    let productMembership = false
                    for(let i = 0; i < targetProductGroups.length; i ++){
                        if(targetProductGroups[i].productIds.includes(productId)){
                            productMembership = true
                            break
                        }
                    }

                    if(productMembership)
                    {
                        //console.log('product ok')
                        //Applying the discount value
                        const targetPricingStrategy = await this.pricingStrategyModel.findById(activeCampaignSummary.pricingStrategyId)
                        switch(targetPricingStrategy.type){
                            case 1:
                                campaignTotalDiscountAmount = (price * targetPricingStrategy.value) / 100
                                if(campaignTotalDiscountAmount > targetPricingStrategy.maxDiscountAmount)
                                {
                                    //console.log('discount code ok')
                                    campaignTotalDiscountAmount = targetPricingStrategy.maxDiscountAmount
                                }
        
                                break
                            case 2:
                                campaignTotalDiscountAmount = targetPricingStrategy.value
                                if(campaignTotalDiscountAmount > targetPricingStrategy.maxDiscountAmount)
                                {
                                    //console.log('discount code not ok')
                                    campaignTotalDiscountAmount = targetPricingStrategy.maxDiscountAmount
                                }
        
                                break
        
                            default:
        
                                break
                        }
                    }
                }
            }
        }

        //????
        //affect the first discount
        reducedPrice = reducedPrice - campaignTotalDiscountAmount
        //console.log(reducedPrice)
        if(reducedPrice <= 0)
        {
            return 0
        }

        //console.log('before discount')
        //Then, affect the discount code
        if(discountCode)
        {
            const activeDiscountCodeSummary = await this.discountCodeSummaryModel.findOne( { code : discountCode } )

            if(activeDiscountCodeSummary){
            
                if( date >= activeDiscountCodeSummary.startDate && date <= activeDiscountCodeSummary.endDate){
                    
                    //Check if user can use campaign discounts
                    const targetUserGroup = await this.userGroupModel.findById(activeDiscountCodeSummary.customerGroupId)
                    
                    //console.log('date OK')
                    if(!targetUserGroup.userIds.includes(userId)){
                        return reducedPrice
                    }

                    //Check if product can be affected by the discount pricing rules
                    const targetProductGroup = await this.productGroupModel.findById(activeDiscountCodeSummary.productGroupId)

                    if(!targetProductGroup.productIds.includes(productId)){
                        return reducedPrice
                    }

                                    //Applying the discount value
                    const targetPricingStrategy = await this.pricingStrategyModel.findById(activeDiscountCodeSummary.pricingStrategyId)
                    switch(targetPricingStrategy.type){
                        case 1:
                            discountCodeTotalDiscountAmount = (price * targetPricingStrategy.value) / 100
                            if(discountCodeTotalDiscountAmount > targetPricingStrategy.maxDiscountAmount)
                            {
                                discountCodeTotalDiscountAmount = targetPricingStrategy.maxDiscountAmount
                            }

                            break
                        case 2:
                            discountCodeTotalDiscountAmount = targetPricingStrategy.value

                            if(discountCodeTotalDiscountAmount > targetPricingStrategy.maxDiscountAmount)
                            {
                                discountCodeTotalDiscountAmount = targetPricingStrategy.maxDiscountAmount
                            }

                            break

                        default:

                            break
                    }
                }
            }
        }

        //combinning discount amounts
        reducedPrice = reducedPrice - discountCodeTotalDiscountAmount
        if(reducedPrice <= 0)
        {
            return 0
        }

        return reducedPrice
    }
}
