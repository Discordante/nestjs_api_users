"use strict";
exports.__esModule = true;
exports.exceptionFilterProviders = void 0;
var core_1 = require("@nestjs/core");
var any_exception_filter_1 = require("./any.exception.filter");
var http_exception_filter_1 = require("./http.exception.filter");
var axios_exception_filter_1 = require("./axios.exception.filter");
exports.exceptionFilterProviders = [
    {
        provide: core_1.APP_FILTER,
        useClass: any_exception_filter_1.AnyExceptionFilter
    },
    {
        provide: core_1.APP_FILTER,
        useClass: http_exception_filter_1.HttpExceptionFilter
    },
    {
        provide: core_1.APP_FILTER,
        useClass: axios_exception_filter_1.AxiosExceptionFilter
    },
];
