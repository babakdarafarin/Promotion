import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactChannel } from "../../models/contact-channel.model";
import { Seeder } from "nestjs-seeder";
 
@Injectable()
export class ContactChannelSeeder implements Seeder {
    constructor(@InjectModel('ContactChannel') private readonly contactChannelModel: Model<ContactChannel>) {}
 
  async seed(): Promise<any> {
    
    const contactChannels: ContactChannel[] = [
        new this.contactChannelModel({
          name: 'e-mail',
          identifier: 1
        }),
        new this.contactChannelModel({
          name: 'SMS',
          identifier: 2
        }),
        new this.contactChannelModel({
          name: 'Notification',
          identifier: 3
        })
    ]

    return await this.contactChannelModel.insertMany(contactChannels)
  }
 
  async drop(): Promise<any> {
    return this.contactChannelModel.deleteMany({});
  }
}




