import { v4 as uuidv4 } from 'uuid';
import { usersRepo, IUser, ITask } from '../repositories';
import { TaskService } from './task.service';

export class UserService {
  public static hasUser = async (id: string): Promise<boolean> => {
    const user = usersRepo.has(id);
    return user;
  };

  public static getAll = async (): Promise<IUser[]> => {
    const users: IUser[] = [];
    usersRepo.forEach((el) => {
      users.push(el);
    });
    return users;
  };

  public static getOne = async (id: string): Promise<IUser | undefined> => {
    const user = usersRepo.get(id);
    return user;
  };

  public static create = async (body: IUser): Promise<IUser | undefined> => {
    const id = uuidv4();
    usersRepo.set(id, { ...body, id });
    return usersRepo.get(id);
  };

  public static update = async (
    id: string,
    body: IUser,
  ): Promise<IUser | undefined> => {
    const user = usersRepo.get(id);
    usersRepo.delete(id);
    usersRepo.set(id, { ...user, ...body, id });
    return usersRepo.get(id);
  };

  public static destroy = async (id: string): Promise<boolean> => usersRepo.delete(id);

  public static deleteUserFromTask = async (id: string): Promise<void> => {
    const tasks = await TaskService.getAll();

    tasks
      .filter((task: ITask) => task.userId === id)
      .forEach(async (task: ITask) => {
        await TaskService.update(task.id, { ...task, userId: null });
      });
  };
}
