export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export const usersRepo = new Map<string, IUser>();
