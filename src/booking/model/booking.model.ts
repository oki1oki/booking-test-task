import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '@prisma/client';

export class BookingModel implements Booking {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  eventId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
