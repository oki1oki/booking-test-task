import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EventModel } from 'src/event/model/event.model';

export class UserModel implements User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Иван' })
  name: string;

  @ApiProperty({ example: 'ivan@example.com' })
  email: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

class UserBookingModel {
  @ApiProperty({ type: EventModel })
  event: EventModel;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}

export class UserWithBookingsModel extends UserModel {
  @ApiProperty({ type: [UserBookingModel], required: false })
  bookings?: UserBookingModel[];
}
