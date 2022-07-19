"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.RequestLoggerInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var request_logger_decorator_1 = require("../request-logger/request-logger.decorator");
var RequestLoggerInterceptor = /** @class */ (function () {
    function RequestLoggerInterceptor(logger) {
        this.logger = logger;
        this.logRequest = true;
        this.logResponse = false;
        this.logError = true;
    }
    RequestLoggerInterceptor_1 = RequestLoggerInterceptor;
    RequestLoggerInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        var startTime = Date.now();
        var request = context.switchToHttp().getRequest();
        if (this.logRequest) {
            this.logger.debug("Request ".concat(request.method, " to ").concat(request.url, " received with params ").concat(JSON.stringify(request.params), ", headers ").concat(JSON.stringify(request.headers), " and body ").concat(JSON.stringify(request.body)));
        }
        return next.handle().pipe((0, rxjs_1.tap)(function (data) {
            if (_this.logResponse) {
                var durationInMs = Date.now() - startTime;
                _this.logger.debug("Response in ".concat(durationInMs, "ms with body: ").concat(JSON.stringify(data)));
            }
        }), (0, rxjs_1.catchError)(function (err) {
            if (_this.logError) {
                _this.logger.error("Call to method finished with an error: ".concat(err.message));
            }
            throw err;
        }));
    };
    RequestLoggerInterceptor.prototype.setLogError = function (logError) {
        this.logError = logError;
    };
    RequestLoggerInterceptor.prototype.setLogResponse = function (logResponse) {
        this.logResponse = logResponse;
    };
    RequestLoggerInterceptor.prototype.setLogRequest = function (logRequest) {
        this.logRequest = logRequest;
    };
    RequestLoggerInterceptor.prototype.setLogAll = function (log) {
        if (log === void 0) { log = false; }
        this.logError = log;
        this.logRequest = log;
        this.logResponse = log;
    };
    RequestLoggerInterceptor.prototype.disableLog = function () {
        this.setLogAll(false);
    };
    var RequestLoggerInterceptor_1;
    RequestLoggerInterceptor = RequestLoggerInterceptor_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, request_logger_decorator_1.Logger)(RequestLoggerInterceptor_1.name))
    ], RequestLoggerInterceptor);
    return RequestLoggerInterceptor;
}());
exports.RequestLoggerInterceptor = RequestLoggerInterceptor;
