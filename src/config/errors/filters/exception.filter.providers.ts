import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AnyExceptionFilter } from './any.exception.filter';
import { HttpExceptionFilter } from './http.exception.filter';
import { AxiosExceptionFilter } from './axios.exception.filter';

export const exceptionFilterProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AnyExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: AxiosExceptionFilter,
  },
];
