import { DataTypes, Model } from 'sequelize';

export type UserModelAttributes = {
  id: number;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

export class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public dateOfBirth!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  }
};
