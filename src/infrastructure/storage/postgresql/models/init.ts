import { Sequelize } from 'sequelize';
import { UserModel, userSchema } from './user.model';

const TableNames = {
  USER_TABLE: 'users',
  ROLE_TABLE: 'roles'
};

type TableNameTypes = (typeof TableNames)[keyof typeof TableNames];

const configModels = (sequelize: Sequelize, tableName: TableNameTypes) => {
  return {
    sequelize,
    tableName,
    underscored: true,
    timestamps: true,
    paranoid: true
  };
};

export const setupModels = (sequelize: Sequelize) => {
  UserModel.init(userSchema, configModels(sequelize, TableNames.USER_TABLE));
};
