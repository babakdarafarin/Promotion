import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CustomResponse } from "src/response/custom-response";
import { ReferralCodeSettingDto } from "./Dtos/referral-code-setting.dto";
import { ReferralCodeUsageInfoDto } from "./Dtos/referral-code-usage-info.dto";
import { ReferralCodeService } from "./referral-code.service";

@Controller()
export class ReferralCodeController {
  constructor(
    private readonly referralCodeService: ReferralCodeService
    ) {}

    @EventPattern('referral_code.create')
    async CreateReferralCode(@Payload() userId: string) : Promise<CustomResponse>{
        return await this.referralCodeService.CreateReferralCode(userId)
    }

    @EventPattern('referral_code.remove')
    async RemoveReferralCode(@Payload() userId: string) : Promise<CustomResponse>{
        return await this.referralCodeService.RemoveReferralCode(userId)
    }

    @EventPattern('referral_code.use')
    async UseReferralCode(@Payload() referralCodeUsageInfoDto: ReferralCodeUsageInfoDto) : Promise<CustomResponse> {
        return await this.referralCodeService.UseReferralCode(referralCodeUsageInfoDto)
    }
    
    @EventPattern('referral_code.create_setting')
    async AddReferralCodeSetting(@Payload() referralCodeSettingDto: ReferralCodeSettingDto) : Promise<CustomResponse> {
        return await this.referralCodeService.AddRefferalCodeSetting(referralCodeSettingDto)
    }

    @EventPattern('referral_code.get_settings')
    async GetReferralCodeSettings() : Promise<CustomResponse> {
        return await this.referralCodeService.GetReferralCodeSettings()
    }

    @EventPattern('referral_code.change_activity')
    async ChaneReferralCodeSettingsActivity(@Payload() referralCodeSettingId: string) : Promise<CustomResponse> {
        return await this.referralCodeService.ChaneReferralCodeSettingsActivity(referralCodeSettingId)
    }

    @EventPattern('referral_code.remove_setting')
    async RemoveReferralCodeSetting(@Payload() referralCodeSetting: string) : Promise<CustomResponse> {
        return await this.referralCodeService.RemoveReferralCodeSetting(referralCodeSetting)
    }
}



