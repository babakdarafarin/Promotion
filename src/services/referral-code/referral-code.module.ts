import { Module } from '@nestjs/common';
import { ReferralCodeController } from './referral-code.controller';
import { ReferralCodeService } from './referral-code.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../../models/user.model";
import { UserService } from '../user/user.service';
import { ReferralCodeSettingSchema } from '../../../models/referral-code-setting.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'ReferralCodeSetting', schema: ReferralCodeSettingSchema}])
  ],
  providers: [ReferralCodeService, UserService],
  controllers: [ReferralCodeController],
  exports: [ReferralCodeService]
})

export class ReferralCodeModule {}
