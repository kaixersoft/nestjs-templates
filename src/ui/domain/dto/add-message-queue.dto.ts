import { IsDefined, IsString } from 'class-validator';

export class AddMessageQueueDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  module: string;
}
