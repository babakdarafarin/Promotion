import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { DiscountCodeService } from "./discount-code.service";
import { DiscountCodeDto } from "./Dtos/discount-code.dto";

@Controller('discountcode')
export class DiscountCodeController {
  constructor(
    private readonly discountCodeService: DiscountCodeService
    ) {}

    @Post()
    async AddDiscountCode(
        @Body('discountcode') dicountCode: DiscountCodeDto){
        const res = await this.discountCodeService.AddDiscountCode(dicountCode)

        return res
    }

    //delete fields
    @Get()
    async GetDiscountCodesSummaries()
    {
        return await this.discountCodeService.GetDiscountCodesSummaries()
    }

    //delete fields
    @Get(':id')
    async GetDiscountCodeDetails(@Param('id') discountCodeSummaryId: string)
    {
        return await this.discountCodeService.GetDiscountCodeDetails(discountCodeSummaryId)
    }

    @Get('changeactivity/:id')
    async ChangeActivity(@Param('id') discountCodeSummaryId: string)
    {
        return await this.discountCodeService.ChangeActivity(discountCodeSummaryId)
    }

    @Delete(':id') // delete from summary as well
    async RemoveDiscountCode(@Param('id') discountCodeSummaryId: string)
    {
        return await this.discountCodeService.RemoveDiscountCode(discountCodeSummaryId)
    }
}