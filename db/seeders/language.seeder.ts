import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Language } from "../../models/language.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class LanguageSeeder implements Seeder {
    constructor(@InjectModel('Language') private readonly langageModel: Model<Language>) {}
 
  async seed(): Promise<any> {
    
    const languages: Language[] = [
      new this.langageModel({
        name: 'FA',
        identifier: 1
      }),
      new this.langageModel({
        name: 'EN',
        identifier: 2
      }),
      new this.langageModel({
        name: 'FR',
        identifier: 3
      })
    ]

    return await this.langageModel.insertMany(languages)
  }
 
  async drop(): Promise<any> {
    return this.langageModel.deleteMany({});
  }
}