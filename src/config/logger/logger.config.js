"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoggerConfigService = void 0;
var common_1 = require("@nestjs/common");
var logging_1 = require("./logging");
var LoggerConfigService = /** @class */ (function () {
    function LoggerConfigService(configService) {
        this.configService = configService;
    }
    LoggerConfigService.prototype.createRequestLoggerOptions = function () {
        var _a;
        return {
            logLevels: (0, logging_1.getLogLevels)(this.configService.get('LOG_LEVEL', 'log')),
            useColors: ((_a = this.configService.get('LOG_COLOR')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' ||
                false,
            interceptor: this.createInterceptorOptions()
        };
    };
    LoggerConfigService.prototype.createInterceptorOptions = function () {
        var _a;
        var logApi = (_a = this.configService
            .get('LOG_API')) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        var interceptorOptions = {
            logError: false,
            logRequest: false,
            logResponse: false
        };
        var interceptorOptionsKeys = Object.keys(interceptorOptions);
        if (logApi === 'all') {
            interceptorOptionsKeys.forEach(function (k) { return (interceptorOptions[k] = true); });
        }
        else if (logApi) {
            logApi
                .split(',')
                .map(function (v) { return v.trim(); })
                .forEach(function (v) {
                if (v === 'error') {
                    interceptorOptions.logError = true;
                }
                else if (v === 'request') {
                    interceptorOptions.logRequest = true;
                }
                else if (v === 'response') {
                    interceptorOptions.logResponse = true;
                }
            });
        }
        return interceptorOptions;
    };
    LoggerConfigService = __decorate([
        (0, common_1.Injectable)()
    ], LoggerConfigService);
    return LoggerConfigService;
}());
exports.LoggerConfigService = LoggerConfigService;
