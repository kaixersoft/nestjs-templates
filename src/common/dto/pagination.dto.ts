import { IsDefined, IsOptional, IsString, IsIn } from 'class-validator';
import { IsValidIfPresent } from './custom/is-valid-if-present';

export class PaginationDto {
  @IsDefined()
  page: number;

  @IsDefined()
  pageSize: number;

  @IsOptional()
  @IsString()
  @IsValidIfPresent('searchCol')
  search: string;

  @IsOptional()
  @IsString()
  searchCol: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @IsValidIfPresent('sortCol')
  sortDir: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  sortCol: string;
}
