import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        bookings: {
          select: {
            event: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findAll() {
    const totalCount = await this.prismaService.user.count();
    const users = await this.prismaService.user.findMany();

    return {
      totalCount,
      users,
    };
  }

  async create(dto: CreateUserDto) {
    const { name, email } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );

    return this.prismaService.user.create({
      data: {
        name,
        email,
      },
    });
  }
}
