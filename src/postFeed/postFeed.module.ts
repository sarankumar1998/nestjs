import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './postFeed.service';
import { PostController } from './postFeed.controller';
import { User } from 'src/Entities/user.Entity';
import { PostData } from 'src/Entities/post.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostData, User])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
