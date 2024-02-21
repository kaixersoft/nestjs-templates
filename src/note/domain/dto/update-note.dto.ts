import { IsDefined, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsDefined()
  @IsString()
  type: string;

  @IsDefined()
  @IsString()
  description: string;
}
