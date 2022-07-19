import { LogLevel } from '@nestjs/common';
import { LOG_LEVELS } from './request-logger.constants';

export const getLogLevels = (logLevel: string): LogLevel[] => {
  const lowerLogLevel = logLevel.toLowerCase();
  const logIndex = LOG_LEVELS.findIndex((v) => v === lowerLogLevel);
  if (logIndex === -1 && lowerLogLevel !== 'log') {
    return getLogLevels('log');
  }
  if (logIndex > -1) {
    return LOG_LEVELS.slice(0, logIndex + 1);
  }

  return [];
};
