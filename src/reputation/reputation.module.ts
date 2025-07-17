import { Module } from '@nestjs/common';
import { ReputationService } from './reputation.service';

@Module({
  providers: [ReputationService]
})
export class ReputationModule {}
