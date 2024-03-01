import { PaginationDto } from '../../dto/pagination.dto';
import { DeleteResult } from 'typeorm';

export abstract class IRepository<T, CreateDto, UpdateDto> {
  abstract create(params: CreateDto): Promise<T>;

  abstract update(id: string, params: UpdateDto): Promise<T>;

  abstract findById(id: string): Promise<T>;

  abstract findAll(
    params: PaginationDto,
  ): Promise<[T[], totalRows: number] | []>;

  abstract find(param?: any): Promise<T[]>;

  abstract delete(id: string): Promise<DeleteResult>;
}
