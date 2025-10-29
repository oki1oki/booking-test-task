import { IsNotEmpty, IsNumber } from 'class-validator';

export class CancelBookingDto {
  @IsNumber()
  @IsNotEmpty()
  bookingId: number;
}
