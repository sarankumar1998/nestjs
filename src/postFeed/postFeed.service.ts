import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.Entity';
import { PostData } from 'src/Entities/post.Entity';
import { Repository } from 'typeorm';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostData)
    private postRepo: Repository<PostData>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createPost(userId: string, title: string, content: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    
  if (!user) {
    throw new Error('User not found'); 
  }

    const post = this.postRepo.create({ title, content, user });
    await this.postRepo.save(post);
    return {
      message:"Created Successfully"
    }
  }

  async findUserPosts(userId: string) {
    return this.postRepo.find({ where: { user: { id: userId } }, select: ['id','title', 'content'] });
  }

  async deletePost(postId: string) {
  const post = await this.postRepo.findOne({ where: { id: postId } });

  if (!post) {
    throw new Error('Post not found');
  }

  await this.postRepo.remove(post);

  return { message: 'Post deleted successfully' };
}

}
