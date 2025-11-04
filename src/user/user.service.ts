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

    const monthNum = month ? parseInt(month) : null;
    const weekNum = week ? parseInt(week) : null;
    const dayNum = day ? parseInt(day) : null;

    const result = await this.prismaService.$queryRaw`
      SELECT
        user_id as "userId",
        DENSE_RANK() OVER (ORDER BY COUNT(*) DESC)::int as place,
        COUNT(*)::int as "bookingCount"
      FROM "Booking"
      WHERE
        (${monthNum}::int IS NULL OR EXTRACT(MONTH FROM created_at) = ${monthNum}::int) AND
        (${weekNum}::int IS NULL OR (${monthNum}::int IS NOT NULL AND 
          EXTRACT(DAY FROM created_at) BETWEEN ((${weekNum}::int - 1) * 7 + 1) AND (${weekNum}::int * 7)
        )) AND
        (${dayNum}::int IS NULL OR EXTRACT(DAY FROM created_at) = ${dayNum}::int)
      GROUP BY user_id
      HAVING COUNT(*) > 0
      ORDER BY "bookingCount" DESC
      LIMIT 10
    `;

    return result;
  }
}
