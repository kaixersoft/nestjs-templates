import { IsDefined, IsOptional, IsString } from 'class-validator';

export class ListProfilesDto {
  @IsDefined()
  @IsString()
  page: string;

  @IsDefined()
  @IsString()
  limit = 10;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  sortBy = 'createdAt';

  @IsOptional()
  @IsString()
  sortType = 'desc';
}
