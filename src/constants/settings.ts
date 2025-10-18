export const isProduction = <string>process.env.MEDTECH_ENV == 'production';
export const config = {
  secretKey: 'My Very Awesome key',
};
export const REDIS_CACHE_PREFIX = `Medtech_${process.env.MEDTECH_ENV ?? ''}`;
export const DEFAULT_REDIS_CACHE_EXPIRY = 36000;

export const USER_TOKEN_EXPIRY_IN_SECONDS = 1814400; // 21 days in seconds
