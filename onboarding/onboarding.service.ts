import { BadRequestException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entity/user/user";
import { EncryptionService } from "src/helpers/encryption.service";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login-user.dto";
import { RoleType } from "src/interfaces/db.enums";
import { AuthService } from "src/auth/auth.service";


export class OnboardingService{
    constructor(
        //private readonly logger: Logger,
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async registerUser(registerDto: RegisterDto){
        const {email, phoneNumber,confirmPassword,firstName,lastName} = registerDto
        const user = await this.userRepository.findOne({where: {email}})
        if(user){
            throw new BadRequestException('user with email exists')
        }
        const phone = await this.userRepository.findOne({where: {phoneNumber}})
        if(phone){
            throw new BadRequestException('user with phone number exists')
        }
        if(registerDto.password !== confirmPassword){
            throw new BadRequestException('password must match')
        }
        const password = await EncryptionService.hash(registerDto.password)

        const newUser = this.userRepository.create({email, phoneNumber,password,firstName,lastName})

        const savedUser = await this.userRepository.save(newUser)

        return savedUser
    }

    async login(loginDto: LoginDto){
        const{email, password} = loginDto;

        const user = await this.userRepository.findOne({where: {email}})
        if(!user){
            throw new NotFoundException("User not found, please sign up")
        }
        const hashedPassword = await EncryptionService.hash(password)
        if(hashedPassword !== user.password){
            throw new BadRequestException('Invalid password')
        }
        const userId = user.id;
        const userRole = RoleType.USER;
        const accessToken = this.authService.generateUserToken(userId,userRole)
        return {
            message:'Login successful',
            accessToken,
            user
        }
    }
} 