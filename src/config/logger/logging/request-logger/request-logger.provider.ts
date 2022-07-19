import { Provider } from '@nestjs/common';
import {
  RequestLoggerFactoryOptions,
  RequestLoggerModuleOptions,
} from './interfaces/request-logger-options.interface';
import { RequestLogger } from './request-logger.service';
import { contextsForLoggers } from './request-logger.decorator';
import {
  REQUEST_LOGGER,
  REQUEST_LOGGER_MODULE_OPTIONS,
  REQUEST_LOGGER_INTERCEPTOR_LOGGER,
} from './request-logger.constants';
import { RequestLoggerInterceptor } from '../interceptors/request-logger.interceptor';

const interceptorFactory = (
  logger: RequestLogger,
  opts?: RequestLoggerFactoryOptions,
): RequestLoggerInterceptor => {
  const interceptor = new RequestLoggerInterceptor(logger);
  const interceptorOpts = opts?.interceptor;
  interceptor.setLogError(interceptorOpts?.logError || false);
  interceptor.setLogRequest(interceptorOpts?.logRequest || false);
  interceptor.setLogResponse(interceptorOpts?.logResponse || false);
  return interceptor;
};

const loggerFactory = (
  logger: RequestLogger,
  opts?: RequestLoggerFactoryOptions,
): RequestLogger => {
  if (opts?.context) {
    logger.setContext(opts.context);
  }
  if (opts?.logLevels) {
    logger.setLogLevels(opts.logLevels);
  }
  if (opts?.useColors) {
    logger.setColorize(opts.useColors);
  }

  return logger;
};

export const createLoggerProvider = (
  opts: RequestLoggerFactoryOptions,
): Provider<RequestLogger> => {
  return {
    provide: `${REQUEST_LOGGER}-${opts.context}`,
    useFactory: (logger) => loggerFactory(logger, opts),
    inject: [RequestLogger],
  };
};

export const createLoggerProviders = (
  options?: RequestLoggerModuleOptions,
): Array<Provider<RequestLogger>> => {
  return contextsForLoggers.map((context) =>
    createLoggerProvider({ context, ...options }),
  );
};

export const createAsyncLoggerProvider = (context: string): Provider => {
  return {
    provide: `${REQUEST_LOGGER}-${context}`,
    useFactory: (logger, options: RequestLoggerModuleOptions) =>
      loggerFactory(logger, { context, ...options }),
    inject: [RequestLogger, REQUEST_LOGGER_MODULE_OPTIONS],
  };
};

export const createAsyncLoggerProviders = (): Array<
  Provider<RequestLogger>
> => {
  return contextsForLoggers.map((context) =>
    createAsyncLoggerProvider(context),
  );
};

export const createAsyncLoggerInterceptorProvider =
  (): Provider<RequestLoggerInterceptor> => {
    return {
      provide: RequestLoggerInterceptor,
      useFactory: (logger, options: RequestLoggerModuleOptions) =>
        interceptorFactory(logger, options),
      inject: [
        REQUEST_LOGGER_INTERCEPTOR_LOGGER,
        REQUEST_LOGGER_MODULE_OPTIONS,
      ],
    };
  };
