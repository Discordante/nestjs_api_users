"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AxiosExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var base_express_exception_filter_1 = require("./base.express.exception.filter");
var axios_1 = require("axios");
var logging_1 = require("../../logger/logging");
var AxiosExceptionFilter = /** @class */ (function (_super) {
    __extends(AxiosExceptionFilter, _super);
    function AxiosExceptionFilter(logger) {
        return _super.call(this, logger) || this;
    }
    AxiosExceptionFilter_1 = AxiosExceptionFilter;
    AxiosExceptionFilter.prototype.onError = function (exception, _request, _response) {
        this.logAxiosError(exception);
        return {
            codeStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        };
    };
    AxiosExceptionFilter.prototype.logAxiosError = function (exception) {
        if (exception.response) {
            this.logResponseError(exception.response);
        }
        else if (exception.request) {
            this.logger.error('No response received from HTTP call');
        }
        else {
            this.logger.error("Failed to make http call: ".concat(exception.message));
        }
    };
    AxiosExceptionFilter.prototype.logResponseError = function (response) {
        this.logger.error("HTTP call failed with status ".concat(response.status, ": headers=\"").concat(JSON.stringify(response.headers), "\", body=\"").concat(JSON.stringify(response.data), "\""));
    };
    var AxiosExceptionFilter_1;
    AxiosExceptionFilter = AxiosExceptionFilter_1 = __decorate([
        (0, common_1.Catch)(axios_1.AxiosError),
        __param(0, (0, logging_1.Logger)(AxiosExceptionFilter_1.name))
    ], AxiosExceptionFilter);
    return AxiosExceptionFilter;
}(base_express_exception_filter_1.BaseExpressExceptionFilter));
exports.AxiosExceptionFilter = AxiosExceptionFilter;
