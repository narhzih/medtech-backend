export class SmsService{
    async sendOtp(phoneNumber: string, otp: string){
        console.log(`Otp Sent ${phoneNumber}: ${otp}`)
    }
}
