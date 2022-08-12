import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'sisuka@test.com',
    description: 'e-mail address associated with the user',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Sisuka',
    description: 'Firstname',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Quinta Cornelia',
    description: 'Lastname',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '2022-08-09',
    description: 'Date of birth',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  birth_date: Date;

  @ApiProperty({
    example: 'PassExample23',
    description: 'Password. At least 8 characters',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
