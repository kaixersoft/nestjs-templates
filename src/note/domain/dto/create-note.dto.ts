import { IsDefined, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsDefined()
  @IsString()
  type: string;

  @IsDefined()
  @IsString()
  description: string;
}
