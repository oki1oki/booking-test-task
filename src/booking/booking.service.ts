import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserService } from 'src/user/user.service';
import { EventService } from 'src/event/event.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  async reserve(dto: CreateBookingDto) {
    const { eventId, userId } = dto;

    const event = await this.eventService.findById(eventId);

    if (!event) throw new NotFoundException('Событие не найдено');

    if (event.bookedSeats >= event.totalSeats)
      throw new ConflictException('Нет доступных мест на это событие');

    const user = await this.userService.findById(userId);

    if (!user) throw new NotFoundException('Пользователь не найден');

    const existingUserBooking = await this.prismaService.booking.findFirst({
      where: {
        eventId,
        userId,
      },
    });

    if (existingUserBooking)
      throw new ConflictException(
        'Пользователь уже забронировал место на это событие',
      );

    const booking = await this.prismaService.booking.create({
      data: {
        eventId,
        userId,
      },
    });

    await this.eventService.updateBookedSeats(eventId, 1);

    return { message: 'Бронирование успешно создано', booking };
  }

  async cancel(dto: CancelBookingDto) {
    const { bookingId: id } = dto;
    const booking = await this.prismaService.booking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) throw new NotFoundException('Бронирование не найдено');

    await this.prismaService.booking.delete({
      where: {
        id,
      },
    });

    await this.eventService.updateBookedSeats(booking.eventId, -1);

    return { message: 'Бронирование успешно отменено' };
  }
}
