"use strict";
exports.__esModule = true;
exports.REQUEST_LOGGER_INTERCEPTOR_LOGGER = exports.REQUEST_LOGGER_MODULE_OPTIONS = exports.REQUEST_LOGGER = exports.LogLevelName = exports.LOG_LEVELS = void 0;
exports.LOG_LEVELS = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
];
var LogLevelName;
(function (LogLevelName) {
    LogLevelName["ERROR"] = "ERROR";
    LogLevelName["WARN"] = "WARN";
    LogLevelName["INFO"] = "INFO";
    LogLevelName["DEBUG"] = "DEBUG";
    LogLevelName["TRACE"] = "TRACE";
})(LogLevelName = exports.LogLevelName || (exports.LogLevelName = {}));
exports.REQUEST_LOGGER = 'REQUEST_LOGGER';
exports.REQUEST_LOGGER_MODULE_OPTIONS = 'REQUEST_LOGGER_MODULE_OPTIONS';
exports.REQUEST_LOGGER_INTERCEPTOR_LOGGER = "".concat(exports.REQUEST_LOGGER, "-RequestLoggerInterceptor");
