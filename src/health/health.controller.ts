import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024), // the process should not use more than 300MB memory
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024), // The process should not have more than 300MB RSS memory allocated
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          threshold: 250 * 1024 * 1024 * 1024,
          path: '/',
        }), // The used disk storage should not exceed 250 GB
    ]);
  }
}

export default HealthController;
