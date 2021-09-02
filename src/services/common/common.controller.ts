import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CustomResponse } from "src/response/custom-response";
import { CommonService } from './common.service'
import { RegionGroupDto } from './Dtos/region-group.dto'

@Controller()
export class CommonController {
  constructor(
    private readonly commonService: CommonService
    ) {}

    @EventPattern('common.get_user_groups') 
    async GetUserGroups() : Promise<CustomResponse> {
        return await this.commonService.GetUserGroups()
    }

    @EventPattern('common.remove_user_group')
    async RemoveUserGroup(@Payload() userGroupId: string) : Promise<CustomResponse> {
        return this.commonService.RemoveUserGroup(userGroupId)
    }


    @EventPattern('common.get_product_groups')
    async GetProductGroups() : Promise<CustomResponse> {
        return await this.commonService.GetProductGroups()
    }

    @EventPattern('common.remove_product_group')
    async RemoveProductGroup(@Payload() productGroupId: string) : Promise<CustomResponse> {
        return this.commonService.RemoveProductGroup(productGroupId)
    }

    @EventPattern('common.get_pricing_strategies')
    async GetPricingStrategies() : Promise<CustomResponse> {
        return await this.commonService.GetPricingStrategies()
    }

    @EventPattern('common.remove_pricing_strategy')
    async RemovePricingStrategy(@Payload() pricingStrategyId: string) : Promise<CustomResponse> {
        return this.commonService.RemovePricingStrategy(pricingStrategyId)
    }

    @EventPattern('common.get_regions')
    async GetRegions() : Promise<CustomResponse> {
        return await this.commonService.GetRegions()
    }

    @EventPattern('common.create_region_group')
    async CreateRegionGroup(@Payload() regionGroup: RegionGroupDto) : Promise<CustomResponse> {
        return await this.commonService.CreateRegionGroup(regionGroup)
    }

    @EventPattern('common.get_region_groups')
    async GetRegionGroups() : Promise<CustomResponse> {
        return await this.commonService.GetRegionGroups()
    }

    @EventPattern('common.remove_region_group')
    async RemoveRegionGroup(@Payload() regionGroupId: string) : Promise<CustomResponse> {
        return this.commonService.RemoveRegionGroup(regionGroupId)
    }
}