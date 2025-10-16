import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: ['src/database/entity/*/*{.ts,.js}'],
  migrations: ['src/database/migration/*{.ts,.js}'],
  connectTimeoutMS: 60000, // 60 seconds,
  logging: true,
  extra: {
    ssl:
      process.env.DB_SUPPORTS_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
    sslmode: 'prefer',
  },
};

export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
  database,
});
