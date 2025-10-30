import { ApiProperty } from '@nestjs/swagger';
import { BookingModel } from '../model/booking.model';

export class CreateBookingResponseDto {
  @ApiProperty({ example: 'Бронирование успешно создано' })
  message: string;

  @ApiProperty({ type: BookingModel })
  booking: BookingModel;
}
