"use strict";
exports.__esModule = true;
exports.setupSwagger = void 0;
var swagger_1 = require("@nestjs/swagger");
var defaultDocsPath = '/docs';
var setupSwagger = function (app, options) {
    var _a;
    var config = new swagger_1.DocumentBuilder()
        .setTitle('Base nest project')
        .setDescription('Incredibly detailed description of how the api works')
        .setVersion('0.0.1');
    (_a = options === null || options === void 0 ? void 0 : options.servers) === null || _a === void 0 ? void 0 : _a.forEach(function (s) { return config.addServer(s); });
    var urlPrefix = (options === null || options === void 0 ? void 0 : options.urlPrefix) || '';
    var docsPath = (options === null || options === void 0 ? void 0 : options.docsPath) || defaultDocsPath;
    if (!docsPath.startsWith('/')) {
        docsPath = '/' + docsPath;
    }
    config.build();
    var document = swagger_1.SwaggerModule.createDocument(app, config.build());
    swagger_1.SwaggerModule.setup("".concat(urlPrefix).concat(docsPath), app, document);
};
exports.setupSwagger = setupSwagger;
