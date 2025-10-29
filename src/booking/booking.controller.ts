import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('reserve')
  async reserve(@Body() dto: CreateBookingDto) {
    return this.bookingService.reserve(dto);
  }

  @Post('cancel')
  async cancel(@Body() dto: CancelBookingDto) {
    return this.bookingService.cancel(dto);
  }
}
