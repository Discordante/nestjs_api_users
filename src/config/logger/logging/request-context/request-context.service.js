"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestContextService = void 0;
var common_1 = require("@nestjs/common");
var request_context_model_1 = require("./request-context.model");
var RequestContextService = /** @class */ (function () {
    function RequestContextService() {
    }
    Object.defineProperty(RequestContextService.prototype, "currentRequestId", {
        get: function () {
            var requestContext = this.currentRequest;
            return (requestContext && requestContext.requestId) || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContextService.prototype, "currentTransactionId", {
        get: function () {
            var requestContext = this.currentRequest;
            return (requestContext && requestContext.transactionId) || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContextService.prototype, "currentRequest", {
        get: function () {
            var requestContext = request_context_model_1.RequestContext.currentContext;
            return requestContext || null;
        },
        enumerable: false,
        configurable: true
    });
    RequestContextService = __decorate([
        (0, common_1.Injectable)()
    ], RequestContextService);
    return RequestContextService;
}());
exports.RequestContextService = RequestContextService;
