import { User } from 'domain/entities/user.entity';
import { Filter, UsersRepo } from 'domain/repositories/users.repo';
import { UserModelAttributes, UserModel } from '../models/user.model';

export class UsersPSQLRepository implements UsersRepo {
  mapToEntity(user: UserModelAttributes): User {
    return new User({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth
    });
  }

  mapToModel(user: User): UserModelAttributes {
    return {
      id: parseInt(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth
    };
  }

  getAll(filter: Filter): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return this.mapToEntity(user);
  }
  async create(user: User): Promise<User> {
    const userModel = await UserModel.create(this.mapToModel(user));
    return this.mapToEntity(userModel);
  }

  async update(id: string, user: User): Promise<User> {
    const mappedUser = this.mapToModel(user);
    const [, affectedRows] = await UserModel.update(mappedUser, {
      where: { id },
      returning: true
    });
    const updatedUser = affectedRows[0].get({ plain: true });
    return this.mapToEntity(updatedUser);
  }
  async delete(id: string): Promise<boolean> {
    const res = await UserModel.destroy({ where: { id } });
    return res == 0 ? false : true;
  }
}
