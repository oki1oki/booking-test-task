import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [PrismaModule, BookingModule, UserModule, EventModule],
})
export class AppModule {}
