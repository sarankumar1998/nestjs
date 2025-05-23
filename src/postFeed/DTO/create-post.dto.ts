import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the post', description: 'Content of the post' })
  @IsString()
  content: string;


}
