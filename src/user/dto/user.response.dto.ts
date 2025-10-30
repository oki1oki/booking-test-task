import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../model/user.model';

export class GetUsersResponseDto {
  @ApiProperty({ example: 100 })
  totalCount: number;

  @ApiProperty({ type: [UserModel] })
  users: UserModel[];
}
