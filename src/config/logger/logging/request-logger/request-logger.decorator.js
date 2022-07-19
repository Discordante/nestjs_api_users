"use strict";
exports.__esModule = true;
exports.Logger = exports.contextsForLoggers = void 0;
var common_1 = require("@nestjs/common");
var request_logger_constants_1 = require("./request-logger.constants");
exports.contextsForLoggers = new Array();
var Logger = function (context) {
    if (!exports.contextsForLoggers.includes(context)) {
        exports.contextsForLoggers.push(context);
    }
    return (0, common_1.Inject)("".concat(request_logger_constants_1.REQUEST_LOGGER, "-").concat(context));
};
exports.Logger = Logger;
