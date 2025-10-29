import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [UserModule, EventModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
