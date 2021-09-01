import { Body, Controller, Post } from '@nestjs/common';
import { PriceCalculatorDto } from './Dtos/price-calculator.dto'
import { PriceCalculatorService } from './price-calculator.service';

@Controller('price-calculator')
export class PriceCalculatorController {
    constructor(
        private readonly priceCalculatorService: PriceCalculatorService
        ) {}

    @Post()
    async CalculateReducedPrices(
        @Body('tobecalculated') ToBeCalculated: PriceCalculatorDto[]){
        return await this.priceCalculatorService.CalculateReducedPrices(ToBeCalculated)
    }
}
