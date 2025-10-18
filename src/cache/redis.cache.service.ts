import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import {
  DEFAULT_REDIS_CACHE_EXPIRY,
  isProduction,
  REDIS_CACHE_PREFIX,
} from 'src/constants/settings';
import { RoleType } from 'src/interfaces/db.enums';

@Injectable()
export class RedisCacheService {
  private readonly redisClient: Redis;
  private readonly cachePrefix: string;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      username: process.env.REDIS_USERNAME,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      tls: isProduction ? {} : undefined,
    });
  }
  getPrefixedKey(key: string): string {
    return `${REDIS_CACHE_PREFIX}_${key}`;
  }
  async getCache<T>(key: string): Promise<T | undefined> {
    const data = await this.redisClient.get(`${REDIS_CACHE_PREFIX}:${key}`);
    if (data) {
      return JSON.parse(data) as T;
    }
  }

  async setCache(key: string, data: any, expiry?: number): Promise<boolean> {
    const result = await this.redisClient.setex(
      this.getPrefixedKey(key),
      expiry || DEFAULT_REDIS_CACHE_EXPIRY,
      JSON.stringify(data),
    );
    return result === 'OK';
  }

  getEntityCacheKey(params: {
    userId: string;
    roleType: RoleType;
    token: string;
    expiry: number;
  }) {
    const key = `${params.userId}_${params.roleType.toLowerCase()}_${params.expiry}`;
    return this.getPrefixedKey(key);
  }

  async setEntityToken(params: {
    userId: string;
    roleType: RoleType;
    token: string;
    expiry: number;
  }): Promise<boolean> {
    return await this.setCache(
      this.getEntityCacheKey(params),
      JSON.stringify(params),
      params.expiry,
    );
  }

  async setCacheNoExpiry(key: string, data: any) {
    await this.redisClient.set(this.getPrefixedKey(key), JSON.stringify(data));
  }

  async removeCache(key: string) {
    await this.redisClient.del(this.getPrefixedKey(key));
  }
}
