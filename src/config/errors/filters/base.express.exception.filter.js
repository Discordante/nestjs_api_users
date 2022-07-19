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
exports.BaseExpressExceptionFilter = void 0;
var BaseExpressExceptionFilter = /** @class */ (function () {
    function BaseExpressExceptionFilter(logger) {
        this.logger = logger;
    }
    BaseExpressExceptionFilter.prototype["catch"] = function (exception, host) {
        var _this = this;
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var errorData = this.onError(exception, request, response);
        Promise.resolve(errorData).then(function (err) {
            _this.logger.error("An error ocurred while processing a ".concat(request.method, " request to ").concat(request.url, " with params '").concat(JSON.stringify(request.query), "' and body '").concat(JSON.stringify(request.body), "'. Response error with status ").concat(err.codeStatus, " and body ").concat(JSON.stringify(err), " ").concat(exception.stack ? ': ' + exception.stack : ''));
            var errorDto = __assign(__assign({}, err), { path: request.url, timestamp: new Date().toISOString() });
            response.status(err.codeStatus).json(errorDto);
        });
    };
    return BaseExpressExceptionFilter;
}());
exports.BaseExpressExceptionFilter = BaseExpressExceptionFilter;
