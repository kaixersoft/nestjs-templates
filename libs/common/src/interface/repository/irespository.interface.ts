import { UpdateResult } from 'typeorm';

export abstract class IRepository<T, CreateDto, UpdateDto> {
  abstract create(params: CreateDto): Promise<T>;

  abstract update(id: string, params: UpdateDto): Promise<T>;

  abstract findById(id: string): Promise<T>;

  abstract findAll(params?: any): Promise<[T[], totalRows: number] | []>;

  abstract find(param?: any): Promise<T[]>;

  abstract delete(id: string): Promise<UpdateResult>;
}
