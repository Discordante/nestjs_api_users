"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestContextMiddleware = void 0;
var common_1 = require("@nestjs/common");
var request_context_model_1 = require("./request-context.model");
var RequestContextMiddleware = /** @class */ (function () {
    function RequestContextMiddleware() {
    }
    RequestContextMiddleware.prototype.use = function (req, res, next) {
        var requestContext = new request_context_model_1.RequestContext(req, res);
        request_context_model_1.RequestContext.cls.enterWith(requestContext);
        next();
    };
    RequestContextMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], RequestContextMiddleware);
    return RequestContextMiddleware;
}());
exports.RequestContextMiddleware = RequestContextMiddleware;
