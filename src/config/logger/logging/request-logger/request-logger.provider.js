"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.createAsyncLoggerInterceptorProvider = exports.createAsyncLoggerProviders = exports.createAsyncLoggerProvider = exports.createLoggerProviders = exports.createLoggerProvider = void 0;
var request_logger_service_1 = require("./request-logger.service");
var request_logger_decorator_1 = require("./request-logger.decorator");
var request_logger_constants_1 = require("./request-logger.constants");
var request_logger_interceptor_1 = require("../interceptors/request-logger.interceptor");
var interceptorFactory = function (logger, opts) {
    var interceptor = new request_logger_interceptor_1.RequestLoggerInterceptor(logger);
    var interceptorOpts = opts === null || opts === void 0 ? void 0 : opts.interceptor;
    interceptor.setLogError((interceptorOpts === null || interceptorOpts === void 0 ? void 0 : interceptorOpts.logError) || false);
    interceptor.setLogRequest((interceptorOpts === null || interceptorOpts === void 0 ? void 0 : interceptorOpts.logRequest) || false);
    interceptor.setLogResponse((interceptorOpts === null || interceptorOpts === void 0 ? void 0 : interceptorOpts.logResponse) || false);
    return interceptor;
};
var loggerFactory = function (logger, opts) {
    if (opts === null || opts === void 0 ? void 0 : opts.context) {
        logger.setContext(opts.context);
    }
    if (opts === null || opts === void 0 ? void 0 : opts.logLevels) {
        logger.setLogLevels(opts.logLevels);
    }
    if (opts === null || opts === void 0 ? void 0 : opts.useColors) {
        logger.setColorize(opts.useColors);
    }
    return logger;
};
var createLoggerProvider = function (opts) {
    return {
        provide: "".concat(request_logger_constants_1.REQUEST_LOGGER, "-").concat(opts.context),
        useFactory: function (logger) { return loggerFactory(logger, opts); },
        inject: [request_logger_service_1.RequestLogger]
    };
};
exports.createLoggerProvider = createLoggerProvider;
var createLoggerProviders = function (options) {
    return request_logger_decorator_1.contextsForLoggers.map(function (context) {
        return (0, exports.createLoggerProvider)(__assign({ context: context }, options));
    });
};
exports.createLoggerProviders = createLoggerProviders;
var createAsyncLoggerProvider = function (context) {
    return {
        provide: "".concat(request_logger_constants_1.REQUEST_LOGGER, "-").concat(context),
        useFactory: function (logger, options) {
            return loggerFactory(logger, __assign({ context: context }, options));
        },
        inject: [request_logger_service_1.RequestLogger, request_logger_constants_1.REQUEST_LOGGER_MODULE_OPTIONS]
    };
};
exports.createAsyncLoggerProvider = createAsyncLoggerProvider;
var createAsyncLoggerProviders = function () {
    return request_logger_decorator_1.contextsForLoggers.map(function (context) {
        return (0, exports.createAsyncLoggerProvider)(context);
    });
};
exports.createAsyncLoggerProviders = createAsyncLoggerProviders;
var createAsyncLoggerInterceptorProvider = function () {
    return {
        provide: request_logger_interceptor_1.RequestLoggerInterceptor,
        useFactory: function (logger, options) {
            return interceptorFactory(logger, options);
        },
        inject: [
            request_logger_constants_1.REQUEST_LOGGER_INTERCEPTOR_LOGGER,
            request_logger_constants_1.REQUEST_LOGGER_MODULE_OPTIONS,
        ]
    };
};
exports.createAsyncLoggerInterceptorProvider = createAsyncLoggerInterceptorProvider;
