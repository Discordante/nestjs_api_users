import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../dto/enum/error-code.enum';
import { ErrorDto } from '../dto/error.dto';

export type ErrorData = {
  codeStatus: HttpStatus;
  message: string;
  errors?: string[];
  code?: ErrorCode;
};

export abstract class BaseExpressExceptionFilter<T = any>
  implements ExceptionFilter<T>
{
  constructor(protected readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorData = this.onError(exception, request, response);
    Promise.resolve(errorData).then((err) => {
      this.logger.error(
        `An error ocurred while processing a ${request.method} request to ${
          request.url
        } with params '${JSON.stringify(
          request.query,
        )}' and body '${JSON.stringify(
          request.body,
        )}'. Response error with status ${
          err.codeStatus
        } and body ${JSON.stringify(err)} ${
          exception.stack ? ': ' + exception.stack : ''
        }`,
      );

      const errorDto: ErrorDto = {
        ...err,
        path: request.url,
        timestamp: new Date().toISOString(),
      };

      response.status(err.codeStatus).json(errorDto);
    });
  }

  abstract onError(
    exception: T,
    request: Request,
    response: Response,
  ): Promise<ErrorData> | ErrorData;
}
