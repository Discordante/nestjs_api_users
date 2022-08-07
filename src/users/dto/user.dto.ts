export class CreateUserDto {
  /**
   * User's email
   * @example sisuka@test.com
   */
  email: string;

  /**
   * Firstname
   * @example Sisuka
   */
  first_name: string;

  /**
   * Lastname
   * @example 'Quinta Cornelia'
   */
  last_name: string;

  /**
   * Date of birth
   * @example 25/03/2015
   */
  birthday: Date;

  /**
   * Password
   * @example %KQCqYUn@f5n
   */
  password: string;
}
