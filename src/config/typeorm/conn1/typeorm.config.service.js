"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TypeOrmConfigService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
var entities_config_1 = require("./entities.config");
var typeorm_config_helper_1 = require("./helpers/typeorm.config.helper");
var TypeOrmConfigService = /** @class */ (function () {
    function TypeOrmConfigService(configService) {
        this.configService = configService;
    }
    TypeOrmConfigService.prototype.createTypeOrmOptions = function (connectionName) {
        return {
            type: 'mysql',
            name: connectionName,
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT', { infer: true }),
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_DATABASE'),
            entities: entities_config_1["default"],
            synchronize: false,
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            logging: (0, typeorm_config_helper_1.parseLoggingOptions)(this.configService.get('DB_LOG')),
            connectTimeout: this.configService.get('DB_CONNECT_TIMEOUT'),
            extra: {
                connectionLimit: this.configService.get('DB_CONNECTION_LIMIT'),
                decimalNumbers: true,
                socketPath: this.configService.get('DB_SOCKETPATH')
            },
            bigNumberStrings: false
        };
    };
    TypeOrmConfigService = __decorate([
        (0, common_1.Injectable)()
    ], TypeOrmConfigService);
    return TypeOrmConfigService;
}());
exports.TypeOrmConfigService = TypeOrmConfigService;
