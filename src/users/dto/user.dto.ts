import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User's email
   * @example sisuka@test.com
   */

  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Firstname
   * @example Sisuka
   */

  @IsNotEmpty()
  @IsString()
  first_name: string;

  /**
   * Lastname
   * @example 'Quinta Cornelia'
   */

  @IsNotEmpty()
  @IsString()
  last_name: string;

  /**
   * Date of birth
   * @example 2022-08-09
   */

  @IsNotEmpty()
  @IsDate()
  birth_date: Date;

  /**
   * Password
   * @example %KQCqYUn@f5n
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
