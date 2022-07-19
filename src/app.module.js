"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var typeorm_1 = require("@nestjs/typeorm");
var exception_filter_providers_1 = require("./config/errors/filters/exception.filter.providers");
var logger_config_1 = require("./config/logger/logger.config");
var logging_1 = require("./config/logger/logging");
var typeorm_config_service_1 = require("./config/typeorm/conn1/typeorm.config.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(logging_1.RequestContextMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true
                }),
                logging_1.RequestContextModule,
                logging_1.RequestLoggerModule.forRootAsync({
                    useClass: logger_config_1.LoggerConfigService
                }),
                typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_config_service_1.TypeOrmConfigService }),
            ],
            providers: __spreadArray([
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useExisting: logging_1.RequestLoggerInterceptor
                }
            ], exception_filter_providers_1.exceptionFilterProviders, true)
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
