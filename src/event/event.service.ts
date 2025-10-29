import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    const totalCount = await this.prismaService.event.count();
    const events = await this.prismaService.event.findMany();

    return {
      totalCount,
      events,
    };
  }

  async create(dto: CreateEventDto) {
    const { name, totalSeats } = dto;

    return this.prismaService.event.create({
      data: {
        name,
        totalSeats,
      },
    });
  }

  async updateBookedSeats(id: number, change: number) {
    return this.prismaService.event.update({
      where: { id },
      data: {
        bookedSeats: {
          increment: change,
        },
      },
    });
  }
}
