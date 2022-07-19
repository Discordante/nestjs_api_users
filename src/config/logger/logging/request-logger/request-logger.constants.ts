import { LogLevel } from '@nestjs/common';

export const LOG_LEVELS: LogLevel[] = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];

export enum LogLevelName {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
}

export const REQUEST_LOGGER = 'REQUEST_LOGGER';
export const REQUEST_LOGGER_MODULE_OPTIONS = 'REQUEST_LOGGER_MODULE_OPTIONS';
export const REQUEST_LOGGER_INTERCEPTOR_LOGGER = `${REQUEST_LOGGER}-RequestLoggerInterceptor`;
