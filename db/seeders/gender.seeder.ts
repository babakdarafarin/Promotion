import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Gender } from "../../models/gender.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class GenderSeeder implements Seeder {
    constructor(@InjectModel('Gender') private readonly genderModel: Model<Gender>) {}
 
  async seed(): Promise<any> {
    
    const genders: Gender[] = [
      new this.genderModel({
        name: 'Female',
        identifier: 1
      }),
      new this.genderModel({
        name: 'Male',
        identifier: 2
      }),
      new this.genderModel({
        name: 'Other',
        identifier: 3
      })
    ]

    return await this.genderModel.insertMany(genders)
  }
 
  async drop(): Promise<any> {
    return this.genderModel.deleteMany({});
  }
}