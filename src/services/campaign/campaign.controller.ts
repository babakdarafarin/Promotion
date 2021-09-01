import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CustomResponse } from "src/response/custom-response";
import { CampaignService } from "./campaign.service";
import { CampaignDto } from "./Dtos/campaign.dto";

@Controller()
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService
    ) {}
    
    @EventPattern('campaign.add')
    async AddCampaign(@Payload() campaign: CampaignDto) : Promise<CustomResponse> {
        return await this.campaignService.AddCampaign(campaign)
    }

    // //delete fields
    // @Get()
    // async GetCampaignsSummaries()
    // {
    //     return await this.campaignService.GetCampaignsSummaries()
    // }

    // //delete fields
    // @Get(':id')
    // async GetCampaignDetails(@Param('id') campaignSummaryId: string)
    // {
    //     return await this.campaignService.GetCampaignDetails(campaignSummaryId)
    // }

    // @Get('changeactivity/:id')
    // async ChangeActivity(@Param('id') campaignSummaryId: string)
    // {
    //     return await this.campaignService.ChangeActivity(campaignSummaryId)
    // }

    // @Delete(':id') // delete from summary as well
    // async RemoveCampaign(@Param('id') campaignSummaryId: string)
    // {
    //     return await this.campaignService.RemoveCampaign(campaignSummaryId)
    // }
}