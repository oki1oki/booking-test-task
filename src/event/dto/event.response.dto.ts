import { ApiProperty } from '@nestjs/swagger';
import { EventModel } from '../model/event.model';

export class GetEventsResponseDto {
  @ApiProperty({ example: 150 })
  totalCount: number;

  @ApiProperty({ type: [EventModel] })
  events: EventModel[];
}
