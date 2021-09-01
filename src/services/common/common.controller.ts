import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { CommonService } from './common.service'
import { RegionGroupDto } from './Dtos/region-group.dto'

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService
    ) {}

    @Get('usergroups')
    async GetUserGroups()
    {
        return await this.commonService.GetUserGroups()
    }

    @Delete('usergroups/:id')
    async RemoveUserGroup(@Param('id') userGroupId: string)
    {
        return this.commonService.RemoveUserGroup(userGroupId)
    }

    @Get('productgroups')
    async GetProductGroups()
    {
        return await this.commonService.GetProductGroups()
    }

    @Delete('productgroups/:id')
    async RemoveProductGroup(@Param('id') productGroupId: string)
    {
        return this.commonService.RemoveProductGroup(productGroupId)
    }

    @Get('pricingstrategies')
    async GetPricingStrategies()
    {
        return await this.commonService.GetPricingStrategies()
    }

    @Delete('pricingstrategies/:id')
    async RemovePricingStrategy(@Param('id') pricingStrategyId: string)
    {
        return this.commonService.RemovePricingStrategy(pricingStrategyId)
    }

    @Get('regions')
    async GetRegions()
    {
        return await this.commonService.GetRegions()
    }

    @Get('regions/regiongroup')
    async GetRegionGroups()
    {
        return await this.commonService.GetRegionGroups()
    }

    @Post('regions/regiongroup')
    async CreateRegionGroup(
        @Body('regiongroup') regionGroup: RegionGroupDto
    )
    {
        return await this.commonService.CreateRegionGroup(regionGroup)
    }

    @Delete('regions/regiongroup/:id')
    async RemoveRegionGroup(@Param('id') regionGroupId: string)
    {
        return this.commonService.RemoveRegionGroup(regionGroupId)
    }
}