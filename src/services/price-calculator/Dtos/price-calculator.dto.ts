export class PriceCalculatorDto {
    public userId : string
    public productId: string 
    public price: number
    public discountCode?: string
    public reducedPrice: number
}