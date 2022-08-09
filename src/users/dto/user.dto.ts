import {
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User's email
   * @example sisuka@test.com
   */
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Firstname
   * @example Sisuka
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  /**
   * Lastname
   * @example 'Quinta Cornelia'
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  /**
   * Date of birth
   * @example 2022-08-09
   */
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  birth_date: Date;

  /**
   * Password
   * @example %KQCqYUn@f5n
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
