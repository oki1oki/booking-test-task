import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventModel } from './model/event.model';
import { GetEventsResponseDto } from './dto/event.response.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ description: 'Получить все события' })
  @ApiResponse({
    status: 200,
    description: 'События получены',
    type: GetEventsResponseDto,
  })
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Получить событие по ID' })
  @ApiResponse({
    status: 200,
    description: 'Событие получено',
    type: EventModel,
  })
  @ApiResponse({
    status: 404,
    description: 'Событие не найдено',
    example: {
      message: 'Событие не найдено',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  async findById(@Param('id') id: string) {
    const event = await this.eventService.findById(Number(id));
    if (!event) throw new NotFoundException('Событие не найдено');

    return event;
  }

  @Post()
  @ApiOperation({ description: 'Создать новое событие' })
  @ApiResponse({
    status: 201,
    description: 'Событие успешно создано',
    type: EventModel,
  })
  async create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }
}
