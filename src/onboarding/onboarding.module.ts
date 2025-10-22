import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entity/user/user";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { AuthModule } from "src/auth/auth.module";
import { OtpService } from "./otp.service";
import { SmsService } from "src/helpers/sms.service";
import { Auth_Otp } from "src/database/entity/user/auth_otp";

@Module({
    imports:[TypeOrmModule.forFeature([User,Auth_Otp]),
    AuthModule],
    controllers: [OnboardingController],
    providers: [OnboardingService,OtpService,SmsService]
})

export class OnboardingModule{}