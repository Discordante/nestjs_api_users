import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import entities from './entities.config';
import { parseLoggingOptions } from '../helpers/typeorm.config.helper';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: connectionName,
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT', { infer: true }),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      entities,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      logging: parseLoggingOptions(this.configService.get('DB_LOG')),
      connectTimeout: this.configService.get('DB_CONNECT_TIMEOUT'),
      extra: {
        connectionLimit: this.configService.get('DB_CONNECTION_LIMIT'),
        decimalNumbers: true,
        socketPath: this.configService.get('DB_SOCKETPATH'),
      },
      bigNumberStrings: false,
    };
  }
}
