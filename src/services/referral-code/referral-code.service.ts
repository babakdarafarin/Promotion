import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
//import { UserService } from '../user/user.service' ????????
import { ReferralCodeSettingDto } from './Dtos/referral-code-setting.dto';
import { ReferralCodeSetting } from '../../..//models/referral-code-setting.model';

@Injectable()
export class ReferralCodeService {
    constructor(
        // private usersService: UserService, ????????????????????????
        @InjectModel('ReferralCodeSetting') private readonly referralCodeSettingModel: Model<ReferralCodeSetting>,
        ) {}
    
    // async CreateReferralCode(userId: string): Promise<String>{
        
    //     console.log(userId)

    //     const user = await this.usersService.findUserById(userId)

    //     if(!user.referralCode || user.referralCode === 'DELETED')
    //     {
    //         const code = await this.GenerateReferralCode(user.username)
            
    //         user.referralCode = String(code)
    //         await user.save()

    //         return code
    //     }

    //     return user.referralCode
    // }

    // async RemoveReferralCode(userId: string){
    //     const user = await this.usersService.findUserById(userId)
        
    //     user.referralCode = 'DELETED'
    //     user.save()
    // }

    // async UseReferralCode(userId: string, referralCode: string){
    //     const user = await this.usersService.findUserById(userId)
    //     const referrer = await this.usersService.findUserByReferralCode(referralCode)
    //     const activeReferralCodeSetting = await this.referralCodeSettingModel.findOne( { isActive : true} )

    //     user.referrerId = referrer.id
    //     user.credit += activeReferralCodeSetting.value
    //     referrer.referrals.push(String(user.id))

    //     await user.save()        
    //     await referrer.save()

    //     return true
    // }

    async AddRefferalCodeSetting(referralCodeSettingDto : ReferralCodeSettingDto){
        const newReferralCodeSetting = new this.referralCodeSettingModel({
            name : referralCodeSettingDto.name,
            value : referralCodeSettingDto.value
        })
        await newReferralCodeSetting.save()

        return newReferralCodeSetting.id
    }

    async GetReferralCodeSettings(){
        return await this.referralCodeSettingModel.find( { isDeleted : false })
    }

    async ChaneReferralCodeSettingsActivity(referralCodeSettingId : string){
        const referralCodeSetting: ReferralCodeSetting = await this.referralCodeSettingModel.findById(referralCodeSettingId)
        
        if(!referralCodeSetting.isActive){
            await this.referralCodeSettingModel.bulkWrite([{
                updateMany:
                {
                    "filter": { "isActive" : "true" },
                    "update": { $set : { "isActive" : "false" } },
                    "upsert": true
                }
            }])
        }

        referralCodeSetting.isActive = !referralCodeSetting.isActive
        await referralCodeSetting.save()

        return true
    }

    private async GenerateReferralCode(username: string): Promise<String>{
        const generatedCode = username + '$12$' + "@GH#%^"

        return generatedCode
    }

    async RemoveReferralCodeSetting(referralCodeSettingId: string){
        const setting = await this.referralCodeSettingModel.findById(referralCodeSettingId)
        setting.isDeleted = true
        setting.isActive = false
        setting.save()
    }
}