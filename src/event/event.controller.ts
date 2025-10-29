import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventService.findById(Number(id));
  }

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }
}
