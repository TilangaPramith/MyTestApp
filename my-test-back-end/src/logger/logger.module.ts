// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], // Export the logger service so it can be used in other modules
})
export class LoggerModule {}
