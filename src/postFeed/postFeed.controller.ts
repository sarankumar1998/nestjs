import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { PostService } from './postFeed.service';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreatePostDto } from './DTO/create-post.dto';



@ApiTags('CreatePost')
@Controller('user-posts')
export class PostController {
  constructor(private postService: PostService) { }

  @Post(':userId')
  @ApiBody({ type: CreatePostDto })
  createPost(
    @Param('userId') userId: string,
    @Body() body: CreatePostDto

  ) {
    return this.postService.createPost(userId, body.title, body.content);
  }

  @Get(':userId')
  // @ApiParam({ name: 'userId', description: 'User UUID' })
  getUserPosts(@Param('userId') userId: string) {
    return this.postService.findUserPosts(userId);
  }
  @Delete(':postId')
  // @ApiParam({ name: 'postId', type: 'string', description: 'UUID of the post' })
  deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }

@Put(':postId')
@ApiBody({ type: CreatePostDto })
editPost(
  @Param('postId') postId: string,
  @Body() body: CreatePostDto
) {
  return this.postService.editPost(postId, body.title, body.content);
}



}
