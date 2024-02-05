import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageQueueDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  module: string;
}
