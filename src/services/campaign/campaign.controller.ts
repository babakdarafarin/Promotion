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

    //delete fields TODO
    @EventPattern('campaign.get_summaries')
    async GetCampaignsSummaries() : Promise<CustomResponse> {
        return await this.campaignService.GetCampaignsSummaries()
    }

    //delete fields TODO
    @EventPattern('campaign.get_details')
    async GetCampaignDetails(@Payload() campaignSummaryId: string) : Promise<CustomResponse> {
        return await this.campaignService.GetCampaignDetails(campaignSummaryId)
    }

    @EventPattern('campaign.change_activity')
    async ChangeActivity(@Payload() campaignSummaryId: string): Promise<CustomResponse>
    {
        return await this.campaignService.ChangeActivity(campaignSummaryId)
    }

    @EventPattern('campaign.remove') // delete from summary as well
    async RemoveCampaign(@Payload() campaignSummaryId: string)
    {
        return await this.campaignService.RemoveCampaign(campaignSummaryId)
    }
}