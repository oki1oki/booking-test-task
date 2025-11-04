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

  async getTopByBookings(params: {
    month?: string;
    week?: string;
    day?: string;
  }) {
    // номер месяца, неделя месяца, просто день(1 - 31)
    const { month, week, day } = params;

    const result = await this.prismaService.$queryRaw`
    SELECT
      user_id as "userId",
      DENSE_RANK() OVER (ORDER BY COUNT(*) DESC)::int as place,
      COUNT(*)::int as "bookingCount"
    FROM "Booking"
    WHERE
      (${month}::int IS NULL OR EXTRACT(MONTH FROM created_at) = ${month}::int) AND

      (${week}::int IS NULL OR (${month}::int IS NOT NULL AND 
        EXTRACT(DAY FROM created_at) BETWEEN ((${week}::int - 1) * 7 + 1) AND (${week}::int * 7)
      )) AND

      (${day}::int IS NULL OR EXTRACT(DAY FROM created_at) = ${day}::int)
    GROUP BY user_id
    HAVING COUNT(*) > 0
    ORDER BY "place" DESC
    LIMIT 10
  `;

    return result;
  }
}
