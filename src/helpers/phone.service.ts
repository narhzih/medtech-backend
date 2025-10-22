import { BadRequestException } from '@nestjs/common';

export class PhoneService {
  // Common African country dialing codes
  private static readonly countryCodes: Record<string, string> = {
    NG: '234', // Nigeria
    KE: '254', // Kenya
    GH: '233', // Ghana
    ZA: '27',  // South Africa
    RW: '250', // Rwanda
    TZ: '255', // Tanzania
  };

  static formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) {
      throw new BadRequestException('Phone number is required');
    }

    // Remove all spaces or hyphens
    phoneNumber = phoneNumber.replace(/\s|-/g, '');

    // Remove leading "+" if present (to simplify detection)
    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.slice(1);
    }

    //Check if it already starts with a known country code
    const countryCode = Object.values(this.countryCodes).find((code) =>
      phoneNumber.startsWith(code),
    );

    if (countryCode) {
      // Remove the country code and ensure no leading zero
      let nationalNumber = phoneNumber.slice(countryCode.length);
      if (nationalNumber.startsWith('0')) {
        nationalNumber = nationalNumber.slice(1);
      }
      return `+${countryCode}${nationalNumber}`;
    }

    // Default to Nigeria if no known code detected
    const defaultCode = this.countryCodes.NG;

    // Validate Nigerian number (must be 11 digits and start with 0)
    if (!/^0[789]\d{9}$/.test(phoneNumber)) {
      throw new BadRequestException('Invalid Nigerian number format');
    }

    // Remove leading 0 and prepend +234
    return `+${defaultCode}${phoneNumber.slice(1)}`;
  }
}