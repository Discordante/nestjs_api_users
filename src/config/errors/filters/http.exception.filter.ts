import { HttpException, Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/config/logger/logging';
import { RequestLogger } from '../../logger/logging/request-logger/request-logger.service';
import {
  BaseExpressExceptionFilter,
  ErrorData,
} from './base.express.exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExpressExceptionFilter<HttpException> {
  constructor(@Logger(HttpExceptionFilter.name) logger: RequestLogger) {
    super(logger);
  }

  onError(
    exception: HttpException,
    _request: Request,
    _response: Response,
  ): ErrorData {
    const { message, errors, code } = exception.getResponse() as any;

    return {
      codeStatus: exception.getStatus(),
      message,
      errors: errors || message,
      code,
    };
  }
}
