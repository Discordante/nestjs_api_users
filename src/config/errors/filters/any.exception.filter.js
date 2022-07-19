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
exports.AnyExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var logging_1 = require("../../logger/logging");
var base_express_exception_filter_1 = require("./base.express.exception.filter");
var AnyExceptionFilter = /** @class */ (function (_super) {
    __extends(AnyExceptionFilter, _super);
    function AnyExceptionFilter(logger) {
        return _super.call(this, logger) || this;
    }
    AnyExceptionFilter_1 = AnyExceptionFilter;
    AnyExceptionFilter.prototype.onError = function (_exception, _request, _response) {
        return {
            codeStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        };
    };
    var AnyExceptionFilter_1;
    AnyExceptionFilter = AnyExceptionFilter_1 = __decorate([
        (0, common_1.Catch)(),
        __param(0, (0, logging_1.Logger)(AnyExceptionFilter_1.name))
    ], AnyExceptionFilter);
    return AnyExceptionFilter;
}(base_express_exception_filter_1.BaseExpressExceptionFilter));
exports.AnyExceptionFilter = AnyExceptionFilter;
