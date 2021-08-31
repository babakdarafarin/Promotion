import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Region } from "../../models/region.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class RegionSeeder implements Seeder {
    constructor(@InjectModel('Region') private readonly regionModel: Model<Region>) {}
 
  async seed(): Promise<any> {
    
    const regions: Region[] = [
      new this.regionModel({
        name: 'US',
        identifier: 1
      }),
      new this.regionModel({
        name: 'Canada',
        identifier: 2
      })
      // new this.regionModel({
      //   name: 'Rest of the world',
      //   identifier: 3
      // })
      // new this.regionModel({
      //   name: 'Apply to all',
      //   identifier: 4
      // })
    ]

    return await this.regionModel.insertMany(regions)
  }
 
  async drop(): Promise<any> {
    return this.regionModel.deleteMany({});
  }
}