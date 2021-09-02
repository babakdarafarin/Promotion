import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CustomResponse } from 'src/response/custom-response';
import { PriceCalculatorDto } from './Dtos/price-calculator.dto'
import { PriceCalculatorService } from './price-calculator.service';

@Controller()
export class PriceCalculatorController {
    constructor(private readonly priceCalculatorService: PriceCalculatorService) {}

    @EventPattern('price_calculator.bulk_calculate_reduced_prices')
    async CalculateReducedPrices(@Payload() ToBeCalculated: PriceCalculatorDto[]) : Promise<CustomResponse> {
        return await this.priceCalculatorService.CalculateReducedPrices(ToBeCalculated)
    }
}
