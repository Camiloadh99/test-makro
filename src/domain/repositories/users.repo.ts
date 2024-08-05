import { User } from 'domain/entities/user.entity';

export type Filter = {
  name?: string;
  email?: string;
};

export type UsersRepo = {
  getAll(filter: Filter): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<boolean>;
};
