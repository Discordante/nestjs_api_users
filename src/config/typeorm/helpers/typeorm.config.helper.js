"use strict";
exports.__esModule = true;
exports.parseLoggingOptions = void 0;
var parseLoggingOptions = function (value) {
    if (!value || value === 'false') {
        return false;
    }
    else if (value === 'all') {
        return 'all';
    }
    else if (value === 'true') {
        return true;
    }
    else if (value.includes(',')) {
        return value.split(',').map(function (v) { return v.trim(); });
    }
    return [value];
};
exports.parseLoggingOptions = parseLoggingOptions;
