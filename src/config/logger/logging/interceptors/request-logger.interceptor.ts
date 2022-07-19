import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Logger } from '../request-logger/request-logger.decorator';
import { RequestLogger } from '../request-logger/request-logger.service';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private logRequest = true;
  private logResponse = false;
  private logError = true;

  constructor(
    @Logger(RequestLoggerInterceptor.name)
    private readonly logger: RequestLogger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    if (this.logRequest) {
      this.logger.debug(
        `Request ${request.method} to ${
          request.url
        } received with params ${JSON.stringify(
          request.params,
        )}, headers ${JSON.stringify(
          request.headers,
        )} and body ${JSON.stringify(request.body)}`,
      );
    }

    return next.handle().pipe(
      tap((data) => {
        if (this.logResponse) {
          const durationInMs = Date.now() - startTime;
          this.logger.debug(
            `Response in ${durationInMs}ms with body: ${JSON.stringify(data)}`,
          );
        }
      }),
      catchError((err) => {
        if (this.logError) {
          this.logger.error(
            `Call to method finished with an error: ${err.message}`,
          );
        }
        throw err;
      }),
    );
  }

  setLogError(logError: boolean): void {
    this.logError = logError;
  }

  setLogResponse(logResponse: boolean): void {
    this.logResponse = logResponse;
  }

  setLogRequest(logRequest: boolean): void {
    this.logRequest = logRequest;
  }

  setLogAll(log = false): void {
    this.logError = log;
    this.logRequest = log;
    this.logResponse = log;
  }

  disableLog(): void {
    this.setLogAll(false);
  }
}
