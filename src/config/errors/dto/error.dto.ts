import { ErrorCode } from './enum/error-code.enum';

export class ErrorDto {
  /**
   * Http status that represents the error
   * @example 500
   */
  codeStatus: number;
  /**
   * Timestamp of the error in format ISO 8601
   * @example '2022-05-04T10:43:02.907Z'
   */
  timestamp: string;
  /**
   * Path where the error took place
   * @example /api/v1
   */
  path: string;
  /**
   * Message describing the error
   * @example 'Internal Server Error'
   */
  message: string;
  /**
   * List of errors that took place
   */
  errors?: string[];
  /**
   * Error code that represents what happend
   */
  code?: ErrorCode;
}
