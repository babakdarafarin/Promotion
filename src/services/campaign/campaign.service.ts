import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
import { CampaignIdentity } from '../../../models/campaign-identity.model';
import { UserGroup } from '../../../models/user-group.model';
import { ProductGroup } from '../../../models/product-group.model';
import { PricingStrategy } from '../../../models/pricing-strategy.model';
import { MessagingStrategy } from '../../../models/messaging-strategy.model';
import { CampaignSummary } from '../../../models/campaign-summary.model';
import { CampaignDto } from './Dtos/campaign.dto'
import { CustomResponse } from 'src/response/custom-response';

///////////////////////////////////////////////////////
///////////////TYPE
////////////////////CHECKING
///////////////////////////////////////////////////////

@Injectable()
export class CampaignService {
    constructor(
        @InjectModel('CampaignIdentity') private readonly campaignIdentityModel: Model<CampaignIdentity>,
        @InjectModel('UserGroup') private readonly userGroupModel: Model<UserGroup>,
        @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroup>,
        @InjectModel('PricingStrategy') private readonly pricingStrategyModel: Model<PricingStrategy>,
        @InjectModel('MessagingStrategy') private readonly messagingStrategyModel: Model<MessagingStrategy>,
        @InjectModel('CampaignSummary') private readonly campaignSummaryModel: Model<CampaignSummary>,
        //private readonly campaignDto: CampaignDto
        ) {}

    async AddCampaign(campaign: CampaignDto) : Promise<CustomResponse> {
        //add campaign identity, 
        const newCampaign = new this.campaignIdentityModel({
            name: campaign.identity.name,
            description: campaign.identity.description,
            startDate: new Date(campaign.identity.startDate),
            endDate: new Date(campaign.identity.endDate),
            bannerColors: campaign.identity.bannerColors
        })
        await newCampaign.save()

        //add customer groups
        let newUserGroups: UserGroup[] = []

        for (let entry of campaign.customerGroups) {
            const tempUserGroup = new this.userGroupModel({
                name: entry.name,
                description: entry.description, 
            })
            
            tempUserGroup.userIds = []

            for (let i = 0; i < entry.userIds.length; i++) {
                tempUserGroup.userIds.push(entry.userIds[i])
            }

            newUserGroups.push(tempUserGroup)
        }
        this.userGroupModel.insertMany(newUserGroups)

        //add product groups
        let newProductGroups: ProductGroup[] = []

        for (let entry of campaign.productGroups) {
            const tempProductGroup = new this.productGroupModel({
                name: entry.name,
                description: entry.description, 
            })
            
            tempProductGroup.productIds = []

            for (let i = 0; i < entry.productIds.length; i++) {
                tempProductGroup.productIds.push(entry.productIds[i])
            }

            newProductGroups.push(tempProductGroup)
        }
        this.productGroupModel.insertMany(newProductGroups)

        //add pricing strategies
        const newPricingStrategy = new this.pricingStrategyModel({
            name: campaign.pricingStrategy.name,
            type: campaign.pricingStrategy.type,
            value: campaign.pricingStrategy.value,
            // minPurchasedAmount: campaign.pricingStrategy.minPurchasedAmount,
            // minPurchasedItems : campaign.pricingStrategy.minPurchasedItems,
            maxDiscountAmount : campaign.pricingStrategy.maxDiscountAmount,
            regionGroups : campaign.pricingStrategy.regionGroups 
        })
        await newPricingStrategy.save()

        //messaging strategies
        let newMessagingStrategies: MessagingStrategy[] = []

        for (let entry of campaign.messagingStrategies) {
            const tempMessagingStrategy = new this.messagingStrategyModel({
                name: entry.name,
                contactChannel: entry.contactChannel
            })

            tempMessagingStrategy.contactAt = []

            for (let i = 0; i < entry.contactAt.length; i++) {
                tempMessagingStrategy.contactAt.push(new Date(entry.contactAt[i]))
            }


            newMessagingStrategies.push(tempMessagingStrategy)
        }
        this.messagingStrategyModel.insertMany(newMessagingStrategies)

        //add summary in the collection
        const newCampaignSummary = new this.campaignSummaryModel({
            type: 2,
            name: newCampaign.name,
            description: newCampaign.description,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            customerGroupsIds: newUserGroups.map((userGroup) => (userGroup.id)),
            customerGroupsNames: newUserGroups.map((userGroup) => (userGroup.name)),
            productGroupsIds: newProductGroups.map((productGroup) => (productGroup.id)),
            productGroupsNames: newProductGroups.map((productGroup) => (productGroup.name)),
            pricingStrategyId:  newPricingStrategy.id,
            pricingStrategyName:  newPricingStrategy.name,
            messagingStrategiesIds: newMessagingStrategies.map((messagingStrategy) => (messagingStrategy.id)),
            messagingStrategiesNames: newMessagingStrategies.map((messagingStrategy) => (messagingStrategy.name)),
            identityId: newCampaign.id
        })
        await newCampaignSummary.save()
   
        return new CustomResponse(
            'Target Campaign Created!',
            true,
            newCampaignSummary.id        
        )
    }

    async GetCampaignsSummaries() : Promise<CustomResponse> {
        return new CustomResponse(
            'Campaing Summaries Listed!',
            true,
            await this.campaignSummaryModel.find( { isDeleted : false } )
        )
    }
        
    //convert to union TODO - SingleQuery
    //join on groups, 
    async GetCampaignDetails(campaignSummaryId: string) : Promise<CustomResponse> {
        const campaignSummary: CampaignSummary = await this.campaignSummaryModel.findById(campaignSummaryId)

        if(!campaignSummary || campaignSummary.isDeleted){
            return new CustomResponse(
                'Target Campaign Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
            const campaign = new CampaignDto
        
            campaign.identity = await this.campaignIdentityModel.findById(campaignSummary.identityId)

            //convert to join
            campaign.customerGroups = await this.userGroupModel.find({ _id: { $in: campaignSummary.customerGroupsIds }})
            campaign.productGroups = await this.productGroupModel.find({ _id: { $in: campaignSummary.productGroupsIds }})
            
            campaign.pricingStrategy = await this.pricingStrategyModel.findById(campaignSummary.pricingStrategyId)
            
            campaign.messagingStrategies = await this.messagingStrategyModel.find({ _id: { $in: campaignSummary.messagingStrategiesIds }})

            return new CustomResponse(
                'Target Campaign\' Details Listed!',
                true,
                campaign
            )
        }
    }

    async ChangeActivity(campaignSummaryId: string) : Promise<CustomResponse> {
        const campaignSummary: CampaignSummary = await this.campaignSummaryModel.findById(campaignSummaryId)

        if(!campaignSummary || campaignSummary.isDeleted){
            return new CustomResponse(
                'Target Campaign Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
            campaignSummary.isActive = !campaignSummary.isActive
            await campaignSummary.save()
    
            return new CustomResponse(
                'Campaign\'s Activity Status Changed!',
                true,
                {
                    activityStatus : campaignSummary.isActive
                }
            )
        }
    }

    async RemoveCampaign(campaignSummaryId: string) : Promise<CustomResponse> {
        const campaignSummary: CampaignSummary = await this.campaignSummaryModel.findById(campaignSummaryId)

        if(!campaignSummary || campaignSummary.isDeleted){
            return new CustomResponse(
                'Target Campaign Was Not Found(Deleted Maybe)!',
                false,
                {}
            )
        }
        else{
            campaignSummary.isDeleted = true
            campaignSummary.isActive = false
            await campaignSummary.save()
    
            return new CustomResponse(
                'Target Campaign Is Deleted!',
                true,
                {}
            )
        }
        

        
    }
}

