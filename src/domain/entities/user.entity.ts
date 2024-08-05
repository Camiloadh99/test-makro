export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.dateOfBirth = user.dateOfBirth;
  }
}
