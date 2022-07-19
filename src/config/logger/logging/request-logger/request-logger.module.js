"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.RequestLoggerModule = void 0;
var common_1 = require("@nestjs/common");
var request_logger_service_1 = require("./request-logger.service");
var request_context_module_1 = require("../request-context/request-context.module");
var request_logger_provider_1 = require("./request-logger.provider");
var request_logger_constants_1 = require("./request-logger.constants");
var request_logger_interceptor_1 = require("../interceptors/request-logger.interceptor");
var RequestLoggerModule = /** @class */ (function () {
    function RequestLoggerModule() {
    }
    RequestLoggerModule_1 = RequestLoggerModule;
    RequestLoggerModule.forRoot = function (options) {
        var loggerProvidersWithContext = (0, request_logger_provider_1.createLoggerProviders)(options);
        return {
            module: RequestLoggerModule_1,
            providers: __spreadArray(__spreadArray([
                request_logger_service_1.RequestLogger
            ], loggerProvidersWithContext, true), [
                request_logger_interceptor_1.RequestLoggerInterceptor,
            ], false),
            exports: __spreadArray(__spreadArray([
                request_logger_service_1.RequestLogger
            ], loggerProvidersWithContext, true), [
                request_logger_interceptor_1.RequestLoggerInterceptor,
            ], false)
        };
    };
    RequestLoggerModule.forRootAsync = function (options) {
        var loggerProvidersWithContext = (0, request_logger_provider_1.createAsyncLoggerProviders)();
        var loggerInterceptor = (0, request_logger_provider_1.createAsyncLoggerInterceptorProvider)();
        return {
            module: RequestLoggerModule_1,
            imports: options.imports,
            providers: __spreadArray(__spreadArray(__spreadArray([
                request_logger_service_1.RequestLogger
            ], loggerProvidersWithContext, true), [
                loggerInterceptor
            ], false), this.createAsyncProviders(options), true),
            exports: __spreadArray(__spreadArray([
                request_logger_service_1.RequestLogger
            ], loggerProvidersWithContext, true), [
                loggerInterceptor,
            ], false)
        };
    };
    RequestLoggerModule.createAsyncProviders = function (options) {
        if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass
                },
            ];
        }
        return [this.createAsyncOptionsProvider(options)];
    };
    RequestLoggerModule.createAsyncOptionsProvider = function (options) {
        var _this = this;
        if (options.useFactory) {
            return {
                provide: request_logger_constants_1.REQUEST_LOGGER_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        var inject = options.useExisting || options.useClass;
        return {
            provide: request_logger_constants_1.REQUEST_LOGGER_MODULE_OPTIONS,
            useFactory: function (optionsFactory) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, optionsFactory.createRequestLoggerOptions()];
            }); }); },
            inject: inject ? [inject] : []
        };
    };
    var RequestLoggerModule_1;
    RequestLoggerModule = RequestLoggerModule_1 = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [request_context_module_1.RequestContextModule],
            providers: [request_logger_service_1.RequestLogger],
            exports: [request_logger_service_1.RequestLogger]
        })
    ], RequestLoggerModule);
    return RequestLoggerModule;
}());
exports.RequestLoggerModule = RequestLoggerModule;
