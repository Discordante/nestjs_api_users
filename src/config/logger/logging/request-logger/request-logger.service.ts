import { Injectable, LogLevel, Scope, ConsoleLogger } from '@nestjs/common';
import { RequestContextService } from '../request-context/request-context.service';

@Injectable({ scope: Scope.TRANSIENT })
export class RequestLogger extends ConsoleLogger {
  private shouldColorize = false;

  constructor(private readonly requestContext: RequestContextService) {
    super();
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    const output = this.stringifyMessage(message, logLevel);
    pidMessage = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel.trim(), logLevel);
    return `${pidMessage}[${formattedLogLevel}] ${this.formatRequestIds()} ${this.getTimestamp()} ${contextMessage}${output}${timestampDiff}\n`;
  }

  protected colorize(message: string, logLevel: LogLevel): string {
    if (!this.shouldColorize) {
      return message;
    }
    return super.colorize(message, logLevel);
  }

  private formatRequestIds(): string {
    return `[${this.requestContext.currentTransactionId} - ${this.requestContext.currentRequestId}]`;
  }

  setColorize(colorize: boolean) {
    this.shouldColorize = colorize;
  }

  protected getTimestamp(): string {
    return new Date().toISOString();
  }

  protected formatPid(pid: number): string {
    return `${pid} - `;
  }
}
