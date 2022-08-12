import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'PassExample23',
    description: 'Old Password.',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  oldPassword: string;

  @ApiProperty({
    example: 'NewPassword65',
    description: 'New Password.',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  newPassword: string;
}
