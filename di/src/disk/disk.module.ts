import { Module } from '@nestjs/common';

import { PowerModule } from '../power/power.module';
import { DiskService } from './disk.service';

@Module({
  imports: [PowerModule],
  providers: [DiskService],
  exports: [DiskService]
})
export class DiskModule {}
