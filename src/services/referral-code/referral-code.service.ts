import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
//import { UserService } from '../user/user.service' ????????
import { ReferralCodeSettingDto } from './Dtos/referral-code-setting.dto';
import { ReferralCodeSetting } from '../../..//models/referral-code-setting.model';
import { UserService } from '../user/user.service';
import { CustomResponse } from 'src/response/custom-response';
import { ReferralCodeUsageInfoDto } from './Dtos/referral-code-usage-info.dto';

@Injectable()
export class ReferralCodeService {
    constructor(
        private usersService: UserService,
        @InjectModel('ReferralCodeSetting') private readonly referralCodeSettingModel: Model<ReferralCodeSetting>
        ) {}
    
    async CreateReferralCode(userId: string): Promise<CustomResponse>{
        const user = await this.usersService.findUserById(userId)

        if(!user){
            return new CustomResponse(
                'User Does Not Exist!',
                false,
                {}
            )
        }
        else{
            if(!user.referralCode || user.referralCode === 'DELETED')
            {
                const code = await this.GenerateReferralCode(user.userId)
                
                user.referralCode = String(code)
                await user.save()

                return new CustomResponse(
                    'Referral Code Created!',
                    true,
                    code
                )
            }

            return new CustomResponse(
                'Referral Code Created!',
                true,
                user.referralCode
            )
        }
    }

    async RemoveReferralCode(userId: string) : Promise<CustomResponse> {
        const user = await this.usersService.findUserById(userId)
        
        if(!user){
            return new CustomResponse(
                'User Does Not Exist!',
                false,
                {}
            )
        }
        else{
            user.referralCode = 'DELETED'
            await user.save()

            return new CustomResponse(
                'Referral Code Is Removed!',
                true,
                {}
            )
        }
    }

    //i cannot invite myself!
    //i cannot get credit from other user more than once!
    //TODO
    async UseReferralCode(referralCodeUsageInfoDto : ReferralCodeUsageInfoDto) : Promise<CustomResponse> {
        const user = await this.usersService.findUserById(referralCodeUsageInfoDto.userId)
        const referrer = await this.usersService.findUserByReferralCode(referralCodeUsageInfoDto.referralCode)

        if(!user || !referrer){
            return new CustomResponse(
                'User/ReferrerCode Does Not Exist!',
                false,
                {}
            )
        }

        const activeReferralCodeSetting = await this.referralCodeSettingModel.findOne( { isActive : true } )

        if(!activeReferralCodeSetting){
            return new CustomResponse(
                'Active Referral Code Setting Does Not Exist!',
                false,
                {}
            )
        }

        user.referrerId = referrer.id
        user.credit += activeReferralCodeSetting.value
        referrer.referrals.push(String(user.id))

        await user.save()        
        await referrer.save()

        return new CustomResponse(
            'Referral Code Is Used!',
            true,
            {}
        )
    }

    async AddRefferalCodeSetting(referralCodeSettingDto : ReferralCodeSettingDto) : Promise<CustomResponse> {
        const newReferralCodeSetting = new this.referralCodeSettingModel({
            name : referralCodeSettingDto.name,
            value : referralCodeSettingDto.value
        })
        await newReferralCodeSetting.save()

        return new CustomResponse(
            'Referral Code Setting Created!',
            true,
            newReferralCodeSetting.id
        )
    }

    async GetReferralCodeSettings() : Promise<CustomResponse> {
        return new CustomResponse(
            'Referral Code Settings Listed!',
            true,
            await this.referralCodeSettingModel.find( { isDeleted : false })
        )
    }

    async ChaneReferralCodeSettingsActivity(referralCodeSettingId : string) : Promise<CustomResponse> {
        const referralCodeSetting: ReferralCodeSetting = await this.referralCodeSettingModel.findById(referralCodeSettingId)
        
        if(!referralCodeSetting)
        {
            return new CustomResponse(
                'Referral Code Setting Does Not Exist!',
                false,
                {}
            )
        }

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

        return new CustomResponse(
            'Referral Code Setting Activity Status Changed!',
            true,
            {
                activityStatus : referralCodeSetting.isActive
            }
        )
    }

    async RemoveReferralCodeSetting(referralCodeSettingId: string) : Promise<CustomResponse> {
        const referralCodeSetting = await this.referralCodeSettingModel.findById(referralCodeSettingId)
        
        if(!referralCodeSetting)
        {
            return new CustomResponse(
                'Referral Code Setting Does Not Exist!',
                false,
                {}
            )
        }
        
        referralCodeSetting.isDeleted = true
        referralCodeSetting.isActive = false
        await referralCodeSetting.save()

        return new CustomResponse(
            'Referral Code Setting Is Removed!',
            true,
            {}
        )
    }

    //create real generator TODO
    private async GenerateReferralCode(userId: string): Promise<String>{
        const generatedCode = userId + '$12$' + "@GH#%^"

        return generatedCode
    }
}