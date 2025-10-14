export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}