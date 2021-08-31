import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VisitType } from "../../models/visit-type.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class VisitTypeSeeder implements Seeder {
    constructor(@InjectModel('VisitType') private readonly visitTypeModel: Model<VisitType>) {}
 
  async seed(): Promise<any> {
    
    const visitTypes: VisitType[] = [
      new this.visitTypeModel({
        name: 'Text Chat',
        identifier: 1
      }),
      new this.visitTypeModel({
        name: 'Phone Call',
        identifier: 2
      }),
      new this.visitTypeModel({
        name: 'Video Call',
        identifier: 3
      })
    ]

    return await this.visitTypeModel.insertMany(visitTypes)
  }
 
  async drop(): Promise<any> {
    return this.visitTypeModel.deleteMany({});
  }
}