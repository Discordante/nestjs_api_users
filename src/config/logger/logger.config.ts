import { Injectable } from '@nestjs/common';
import {
  RequestLoggerAsyncOptionsFactory,
  RequestLoggerModuleOptions,
  getLogLevels,
  RequestLoggerModuleInterceptorOptions,
} from './logging';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerConfigService implements RequestLoggerAsyncOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRequestLoggerOptions(): RequestLoggerModuleOptions {
    return {
      logLevels: getLogLevels(this.configService.get('LOG_LEVEL', 'log')),
      useColors:
        this.configService.get<string>('LOG_COLOR')?.toLowerCase() === 'true' ||
        false,
      interceptor: this.createInterceptorOptions(),
    };
  }

  private createInterceptorOptions(): RequestLoggerModuleInterceptorOptions {
    const logApi = this.configService
      .get<string>('LOG_API')
      ?.toLocaleLowerCase();
    const interceptorOptions: RequestLoggerModuleInterceptorOptions = {
      logError: false,
      logRequest: false,
      logResponse: false,
    };

    const interceptorOptionsKeys = Object.keys(interceptorOptions) as Array<
      keyof typeof interceptorOptions
    >;
    if (logApi === 'all') {
      interceptorOptionsKeys.forEach((k) => (interceptorOptions[k] = true));
    } else if (logApi) {
      logApi
        .split(',')
        .map((v) => v.trim())
        .forEach((v) => {
          if (v === 'error') {
            interceptorOptions.logError = true;
          } else if (v === 'request') {
            interceptorOptions.logRequest = true;
          } else if (v === 'response') {
            interceptorOptions.logResponse = true;
          }
        });
    }

    return interceptorOptions;
  }
}
