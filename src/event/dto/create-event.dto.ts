import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'Name cannot be empty or contain only spaces',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  totalSeats: number;
}
