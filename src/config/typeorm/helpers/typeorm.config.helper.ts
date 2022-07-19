import { LoggerOptions } from 'typeorm';

export const parseLoggingOptions = (value?: string): LoggerOptions => {
  if (!value || value === 'false') {
    return false;
  } else if (value === 'all') {
    return 'all';
  } else if (value === 'true') {
    return true;
  } else if (value.includes(',')) {
    return value.split(',').map((v) => v.trim()) as LoggerOptions;
  }
  return [value] as LoggerOptions;
};
