import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RequestLogger } from './request-logger.service';
import { RequestContextModule } from '../request-context/request-context.module';
import {
  RequestLoggerModuleOptions,
  RequestLoggerModuleAsyncOptions,
  RequestLoggerAsyncOptionsFactory,
} from './interfaces/request-logger-options.interface';
import {
  createLoggerProviders,
  createAsyncLoggerProviders,
  createAsyncLoggerInterceptorProvider,
} from './request-logger.provider';
import { REQUEST_LOGGER_MODULE_OPTIONS } from './request-logger.constants';
import { RequestLoggerInterceptor } from '../interceptors/request-logger.interceptor';

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [RequestLogger],
  exports: [RequestLogger],
})
export class RequestLoggerModule {
  static forRoot(options: RequestLoggerModuleOptions): DynamicModule {
    const loggerProvidersWithContext = createLoggerProviders(options);

    return {
      module: RequestLoggerModule,
      providers: [
        RequestLogger,
        ...loggerProvidersWithContext,
        RequestLoggerInterceptor,
      ],
      exports: [
        RequestLogger,
        ...loggerProvidersWithContext,
        RequestLoggerInterceptor,
      ],
    };
  }

  static forRootAsync(options: RequestLoggerModuleAsyncOptions): DynamicModule {
    const loggerProvidersWithContext = createAsyncLoggerProviders();
    const loggerInterceptor = createAsyncLoggerInterceptorProvider();

    return {
      module: RequestLoggerModule,
      imports: options.imports,
      providers: [
        RequestLogger,
        ...loggerProvidersWithContext,
        loggerInterceptor,
        ...this.createAsyncProviders(options),
      ],
      exports: [
        RequestLogger,
        ...loggerProvidersWithContext,
        loggerInterceptor,
      ],
    };
  }

  private static createAsyncProviders(
    options: RequestLoggerModuleAsyncOptions,
  ): Provider[] {
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }
    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: RequestLoggerModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: REQUEST_LOGGER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useExisting || options.useClass;

    return {
      provide: REQUEST_LOGGER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: RequestLoggerAsyncOptionsFactory) =>
        optionsFactory.createRequestLoggerOptions(),
      inject: inject ? [inject] : [],
    };
  }
}
