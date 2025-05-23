// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { PostModule } from './postFeed/postFeed.module';

import { User } from './Entities/user.Entity';
import { PostData } from './Entities/post.Entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => {
        return {
          type: 'postgres',
          host: cfg.get('DB_HOST')!,
          port: parseInt(cfg.get('DB_PORT')!, 10),
          username: cfg.get('DB_USERNAME')!,
          password: cfg.get('DB_PASSWORD')!,
          database: cfg.get('DB_NAME')!,
          entities: [User, PostData],
          synchronize: true,
        };
      },

      inject: [ConfigService],
    }),

    AuthModule,
    PostModule,
  ],
})
export class AppModule { }
