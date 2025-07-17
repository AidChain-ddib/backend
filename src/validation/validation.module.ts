import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';
import { HederaModule } from '../hedera/hedera.module';
import { IpfsModule } from '../ipfs/ipfs.module';

@Module({
  imports: [HederaModule, IpfsModule],
  controllers: [ValidationController],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}
