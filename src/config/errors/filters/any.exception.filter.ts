import { Catch, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/config/logger/logging';
import { RequestLogger } from '../../logger/logging/request-logger/request-logger.service';
import {
  BaseExpressExceptionFilter,
  ErrorData,
} from './base.express.exception.filter';

@Catch()
export class AnyExceptionFilter extends BaseExpressExceptionFilter {
  constructor(@Logger(AnyExceptionFilter.name) logger: RequestLogger) {
    super(logger);
  }

  onError(_exception: any, _request: Request, _response: Response): ErrorData {
    return {
      codeStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
  }
}
