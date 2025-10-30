import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'Name cannot be empty or contain only spaces',
  })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalSeats: number;
}
