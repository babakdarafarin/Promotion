import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { ReferralCodeSettingDto } from "./Dtos/referral-code-setting.dto";
import { ReferralCodeService } from "./referral-code.service";

@Controller('referralcodes')
export class ReferralCodeController {
  constructor(
    private readonly referralCodeService: ReferralCodeService
    ) {}
    
    @Get('setting')
    async GetReferralCodeSettings(){
        return await this.referralCodeService.GetReferralCodeSettings()
    }

    @Post('setting')
    async AddReferralCodeSetting(
        @Body('referralcodesetting') referralCodeSettingDto: ReferralCodeSettingDto,
    ){
        return await this.referralCodeService.AddRefferalCodeSetting(referralCodeSettingDto)
    }

    @Get('setting/changeactivity/:id')
    async ChaneReferralCodeSettingsActivity(
        @Param('id') referralCodeSettingId: string
    ){
        return await this.referralCodeService.ChaneReferralCodeSettingsActivity(referralCodeSettingId)
    }

    @Delete('setting/:id')
    async RemoveReferralCodeSetting(
        @Param('id') referralCodeSetting: string
    ){
        return await this.referralCodeService.RemoveReferralCodeSetting(referralCodeSetting)
    }

    // @Get(':id')
    // async CreateReferralCode(@Param('id') userId: string)
    // {
    //     const code = await this.referralCodeService.CreateReferralCode(userId)

    //     return code
    // }

    // @Delete(':id')
    // async RemoveReferralCode(@Param('id') userId: string)
    // {
    //     await this.referralCodeService.RemoveReferralCode(userId)

    //     return true
    // }

    // @Post()
    // async UseReferralCode(
    //     @Body('id') userId: string,
    //     @Body('code') referralCode: string
    // ){
    //     await this.referralCodeService.UseReferralCode(userId, referralCode)

    //     return true
    // }

}



