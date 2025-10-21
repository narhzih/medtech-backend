import { Body, Controller, Get, Post } from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";
import { RegisterDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login-user.dto";

@Controller()
export class OnboardingController{
    constructor(private readonly onboardingService: OnboardingService) {}
    @Post('signup')
    async register(@Body() registerDto: RegisterDto) {
        return this.onboardingService.registerUser(registerDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.onboardingService.login(loginDto)
    }

}