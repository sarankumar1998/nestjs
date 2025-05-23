import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'demo_user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'strongPassword123' })
  @MinLength(4)
  password: string;
}
