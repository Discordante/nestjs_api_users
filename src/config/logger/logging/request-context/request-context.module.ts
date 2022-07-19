import { Module, Global } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { RequestContextMiddleware } from './request-context.middleware';

@Global()
@Module({
  providers: [RequestContextMiddleware, RequestContextService],
  exports: [RequestContextMiddleware, RequestContextService],
})
export class RequestContextModule {}
