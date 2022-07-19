import { Injectable } from '@nestjs/common';
import { RequestContext } from './request-context.model';

@Injectable()
export class RequestContextService {
  get currentRequestId(): string | null {
    const requestContext = this.currentRequest;
    return (requestContext && requestContext.requestId) || null;
  }

  get currentTransactionId(): string | null {
    const requestContext = this.currentRequest;
    return (requestContext && requestContext.transactionId) || null;
  }

  private get currentRequest() {
    const requestContext = RequestContext.currentContext;
    return requestContext || null;
  }
}
