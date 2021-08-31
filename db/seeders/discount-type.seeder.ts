import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DiscountType } from "../../models/discount-type.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class DiscountTypeSeeder implements Seeder {
    constructor(@InjectModel('DiscountType') private readonly discountTypeModel: Model<DiscountType>) {}
 
  async seed(): Promise<any> {
    
    const discountTypes: DiscountType[] = [
      new this.discountTypeModel({
        name: 'Percentage',
        identifier: 1
      }),
      new this.discountTypeModel({
        name: 'Fixed',
        identifier: 2
      }),
      // new this.discountTypeModel({
      //   name: 'YForX',
      //   identifier: 4
      // }),
      new this.discountTypeModel({
        name: 'CheaperShipment',
        identifier: 3
      })
    ]

    return await this.discountTypeModel.insertMany(discountTypes)
  }
 
  async drop(): Promise<any> {
    return this.discountTypeModel.deleteMany({});
  }
}