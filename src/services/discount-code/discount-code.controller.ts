import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CustomResponse } from "src/response/custom-response";
import { DiscountCodeService } from "./discount-code.service";
import { DiscountCodeDto } from "./Dtos/discount-code.dto";

@Controller()
export class DiscountCodeController {
  constructor(
    private readonly discountCodeService: DiscountCodeService
    ) {}

    @EventPattern('dicount_code.create')
    async AddDiscountCode(@Payload() dicountCode: DiscountCodeDto) : Promise<CustomResponse> { 
        return await this.discountCodeService.AddDiscountCode(dicountCode)
    }

    //delete fields
    @EventPattern('discount_code.get_summaries')
    async GetDiscountCodesSummaries() : Promise<CustomResponse> { 
        return await this.discountCodeService.GetDiscountCodesSummaries()
    }

    //delete fields
    @EventPattern('discount_code.get_details')
    async GetDiscountCodeDetails(@Payload() discountCodeSummaryId: string) : Promise<CustomResponse> { 
        return await this.discountCodeService.GetDiscountCodeDetails(discountCodeSummaryId)
    }

    @EventPattern('discount_code.change_activity')
    async ChangeActivity(@Payload() discountCodeSummaryId: string) : Promise<CustomResponse> { 
        return await this.discountCodeService.ChangeActivity(discountCodeSummaryId)
    }

    @EventPattern('discount_code.remove') // delete from summary as well
    async RemoveDiscountCode(@Payload() discountCodeSummaryId: string) : Promise<CustomResponse> { 
        return await this.discountCodeService.RemoveDiscountCode(discountCodeSummaryId)
    }
}