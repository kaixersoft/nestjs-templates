import { IsDefined, IsString, IsUUID } from 'class-validator';

export class GetMessageQueueDto {
  @IsDefined()
  @IsString()
  @IsUUID()
  queueId: string;
}
