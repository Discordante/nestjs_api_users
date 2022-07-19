"use strict";
exports.__esModule = true;
exports.RequestContext = exports.X_TRANSACTION_ID = void 0;
var async_hooks_1 = require("async_hooks");
var uuid_1 = require("uuid");
exports.X_TRANSACTION_ID = 'x-transaction-id';
var RequestContext = /** @class */ (function () {
    function RequestContext(req, res) {
        this.req = req;
        this.res = res;
        this.transactionId = req.header(exports.X_TRANSACTION_ID) || (0, uuid_1.v4)();
        this.requestId = (0, uuid_1.v4)();
    }
    Object.defineProperty(RequestContext, "currentContext", {
        get: function () {
            return this.cls.getStore();
        },
        enumerable: false,
        configurable: true
    });
    RequestContext.cls = new async_hooks_1.AsyncLocalStorage();
    return RequestContext;
}());
exports.RequestContext = RequestContext;
