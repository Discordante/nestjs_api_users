"use strict";
exports.__esModule = true;
exports.getLogLevels = void 0;
var request_logger_constants_1 = require("./request-logger.constants");
var getLogLevels = function (logLevel) {
    var lowerLogLevel = logLevel.toLowerCase();
    var logIndex = request_logger_constants_1.LOG_LEVELS.findIndex(function (v) { return v === lowerLogLevel; });
    if (logIndex === -1 && lowerLogLevel !== 'log') {
        return (0, exports.getLogLevels)('log');
    }
    if (logIndex > -1) {
        return request_logger_constants_1.LOG_LEVELS.slice(0, logIndex + 1);
    }
    return [];
};
exports.getLogLevels = getLogLevels;
