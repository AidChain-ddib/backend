import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DonationModule } from './donation/donation.module';
import { ProjectModule } from './project/project.module';
import { ConfigModule } from '@nestjs/config';
import { HederaModule } from './hedera/hedera.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { ReputationModule } from './reputation/reputation.module';
import { EventsModule } from './events/events.module';
import { NotificationModule } from './notification/notification.module';
import { DisputeModule } from './dispute/dispute.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DonationModule,
    ProjectModule,
    HederaModule,
    IpfsModule,
    ReputationModule,
    EventsModule,
    NotificationModule,
    DisputeModule,
    ValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
