import { LogLevel, ModuleMetadata, Type } from '@nestjs/common';

export type RequestLoggerModuleInterceptorOptions = {
  logRequest?: boolean;
  logResponse?: boolean;
  logError?: boolean;
};

export type RequestLoggerModuleOptions = {
  logLevels?: LogLevel[];
  useColors?: boolean;
  interceptor?: RequestLoggerModuleInterceptorOptions;
};

export type RequestLoggerFactoryOptions = {
  context?: string;
  logLevels?: LogLevel[];
  useColors?: boolean;
  interceptor?: RequestLoggerModuleInterceptorOptions;
};

export interface RequestLoggerAsyncOptionsFactory {
  createRequestLoggerOptions():
    | Promise<RequestLoggerModuleOptions>
    | RequestLoggerModuleOptions;
}

export interface RequestLoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<RequestLoggerAsyncOptionsFactory>;
  useClass?: Type<RequestLoggerAsyncOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<RequestLoggerModuleOptions> | RequestLoggerModuleOptions;
  inject?: any[];
}
