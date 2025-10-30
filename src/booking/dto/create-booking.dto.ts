import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
