import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookingResponseDto } from './dto/booking.response.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('reserve')
  @ApiOperation({ description: 'Создание бронирования' })
  @ApiResponse({
    status: 201,
    description: 'Успешное бронирование',
    type: CreateBookingResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Событие или пользователь не найдены',
    examples: {
      eventNotFound: {
        summary: 'Событие не найдено',
        value: {
          message: 'Событие не найдено',
          error: 'Not Found',
          statusCode: 404,
        },
      },
      userNotFound: {
        summary: 'Пользователь не найден',
        value: {
          message: 'Пользователь не найден',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Нет доступных мест или пользователь уже забронировал место',
    examples: {
      noAvailableSeats: {
        summary: 'Нет доступных мест',
        value: {
          message: 'Нет доступных мест на это событие',
          error: 'Conflict',
          statusCode: 409,
        },
      },
      userAlreadyBooked: {
        summary: 'Пользователь уже забронировал место',
        value: {
          message: 'Пользователь уже забронировал место на это событие',
          error: 'Conflict',
          statusCode: 409,
        },
      },
    },
  })
  async reserve(@Body() dto: CreateBookingDto) {
    return this.bookingService.reserve(dto);
  }

  @Post('cancel')
  @ApiOperation({ description: 'Отмена бронирования' })
  @ApiResponse({
    status: 201,
    description: 'Бронирование успешно отменено',
    example: {
      message: 'Бронирование успешно отменено',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Бронирование не найдено',
    example: {
      message: 'Бронирование не найдено',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  async cancel(@Body() dto: CancelBookingDto) {
    return this.bookingService.cancel(dto);
  }
}
