"use strict";
exports.__esModule = true;
exports.ErrorDto = void 0;
var openapi = require("@nestjs/swagger");
var ErrorDto = /** @class */ (function () {
    function ErrorDto() {
    }
    ErrorDto._OPENAPI_METADATA_FACTORY = function () {
        return { codeStatus: { required: true, type: function () { return Number; }, description: "Http status that represents the error", example: 500 }, timestamp: { required: true, type: function () { return String; }, description: "Timestamp of the error in format ISO 8601", example: "2022-05-04T10:43:02.907Z" }, path: { required: true, type: function () { return String; }, description: "Path where the error took place", example: "/api/v1" }, message: { required: true, type: function () { return String; }, description: "Message describing the error", example: "Internal Server Error" }, errors: { required: false, type: function () { return [String]; }, description: "List of errors that took place" }, code: { required: false, description: "Error code that represents what happend", "enum": require("./enum/error-code.enum").ErrorCode } };
    };
    return ErrorDto;
}());
exports.ErrorDto = ErrorDto;
