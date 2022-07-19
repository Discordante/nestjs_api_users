import { Catch, HttpStatus } from '@nestjs/common';
import {
  BaseExpressExceptionFilter,
  ErrorData,
} from './base.express.exception.filter';
import { AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import { Logger } from 'src/config/logger/logging';
import { RequestLogger } from '../../logger/logging/request-logger/request-logger.service';

@Catch(AxiosError)
export class AxiosExceptionFilter extends BaseExpressExceptionFilter<AxiosError> {
  constructor(@Logger(AxiosExceptionFilter.name) logger: RequestLogger) {
    super(logger);
  }

  onError(
    exception: AxiosError,
    _request: Request,
    _response: Response,
  ): ErrorData {
    this.logAxiosError(exception);
    return {
      codeStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
  }

  private logAxiosError(exception: AxiosError): void {
    if (exception.response) {
      this.logResponseError(exception.response);
    } else if (exception.request) {
      this.logger.error('No response received from HTTP call');
    } else {
      this.logger.error(`Failed to make http call: ${exception.message}`);
    }
  }

  private logResponseError(response: AxiosResponse): void {
    this.logger.error(
      `HTTP call failed with status ${
        response.status
      }: headers="${JSON.stringify(response.headers)}", body="${JSON.stringify(
        response.data,
      )}"`,
    );
  }
}
