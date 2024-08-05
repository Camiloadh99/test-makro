import { UsersPSQLRepository } from 'infrastructure/storage/postgresql/repositories/users.psql';
import { buildGetAll } from './users/get_all';

const usersRepo = new UsersPSQLRepository();
const getAll = buildGetAll({ usersRepo });

export { getAll };
