import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';

export class EventModel implements Event {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Бойцовский клуб' })
  name: string;

  @ApiProperty({ example: 100 })
  totalSeats: number;

  @ApiProperty({ example: 50 })
  bookedSeats: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
