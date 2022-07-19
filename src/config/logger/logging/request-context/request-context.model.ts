import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

export const X_TRANSACTION_ID = 'x-transaction-id';

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  readonly requestId: string;
  readonly transactionId: string;

  constructor(public readonly req: Request, public readonly res: Response) {
    this.transactionId = req.header(X_TRANSACTION_ID) || v4();
    this.requestId = v4();
  }
}
