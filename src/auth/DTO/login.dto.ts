import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'demo_user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}
