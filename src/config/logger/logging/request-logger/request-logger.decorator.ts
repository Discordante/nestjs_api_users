import { Inject } from '@nestjs/common';
import { REQUEST_LOGGER } from './request-logger.constants';

export const contextsForLoggers: string[] = new Array<string>();

export const Logger = (context: string) => {
  if (!contextsForLoggers.includes(context)) {
    contextsForLoggers.push(context);
  }
  return Inject(`${REQUEST_LOGGER}-${context}`);
};
