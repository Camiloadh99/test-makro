import { UsersRepo } from 'domain/repositories/users.repo';

type Dependencies = {
  usersRepo: UsersRepo;
};

export const buildGetAll = ({ usersRepo }: Dependencies) => {
  const execute = async () => {
    const users = await usersRepo.getAll({});
    console.log('Caso de uso :D ');
    return users;
  };
  return execute;
};
