import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @Matches(/^(?!\s*$).+/, {
    message: 'Name cannot be empty or contain only spaces',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
