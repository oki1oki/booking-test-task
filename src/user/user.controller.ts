import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersResponseDto } from './dto/user.response.dto';
import { UserModel, UserWithBookingsModel } from './model/user.model';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ description: 'Получить всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Пользователи получены',
    type: GetUsersResponseDto,
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Получить пользователя по ID' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь получен',
    type: UserWithBookingsModel,
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
    example: {
      message: 'Пользователь не найден',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  @Post()
  @ApiOperation({ description: 'Создать нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    type: UserModel,
  })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
