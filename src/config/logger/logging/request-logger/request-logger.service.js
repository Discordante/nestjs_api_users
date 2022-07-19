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
exports.__esModule = true;
exports.RequestLogger = void 0;
var common_1 = require("@nestjs/common");
var RequestLogger = /** @class */ (function (_super) {
    __extends(RequestLogger, _super);
    function RequestLogger(requestContext) {
        var _this = _super.call(this) || this;
        _this.requestContext = requestContext;
        _this.shouldColorize = false;
        return _this;
    }
    RequestLogger.prototype.formatMessage = function (logLevel, message, pidMessage, formattedLogLevel, contextMessage, timestampDiff) {
        var output = this.stringifyMessage(message, logLevel);
        pidMessage = this.colorize(pidMessage, logLevel);
        formattedLogLevel = this.colorize(formattedLogLevel.trim(), logLevel);
        return "".concat(pidMessage, "[").concat(formattedLogLevel, "] ").concat(this.formatRequestIds(), " ").concat(this.getTimestamp(), " ").concat(contextMessage).concat(output).concat(timestampDiff, "\n");
    };
    RequestLogger.prototype.colorize = function (message, logLevel) {
        if (!this.shouldColorize) {
            return message;
        }
        return _super.prototype.colorize.call(this, message, logLevel);
    };
    RequestLogger.prototype.formatRequestIds = function () {
        return "[".concat(this.requestContext.currentTransactionId, " - ").concat(this.requestContext.currentRequestId, "]");
    };
    RequestLogger.prototype.setColorize = function (colorize) {
        this.shouldColorize = colorize;
    };
    RequestLogger.prototype.getTimestamp = function () {
        return new Date().toISOString();
    };
    RequestLogger.prototype.formatPid = function (pid) {
        return "".concat(pid, " - ");
    };
    RequestLogger = __decorate([
        (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
    ], RequestLogger);
    return RequestLogger;
}(common_1.ConsoleLogger));
exports.RequestLogger = RequestLogger;
