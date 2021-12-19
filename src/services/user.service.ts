import { v4 as uuidv4 } from 'uuid';
import { usersRepo, IUser, ITask } from '../repositories';
import { TaskService } from './task.service';

export class UserService {

  /**
  * Сhecks the availability of the user.
  *
  * @param id - The User ID, string
  * 
  * @returns Whether the user was found by id, boolean
  *
  */
  public static hasUser = async (id: string): Promise<boolean> => {
    const user = usersRepo.has(id);
    return user;
  };

  /**
  * Returns array of User.
  *
  * @returns all users, Array<IUser>
  *
  */
  public static getAll = async (): Promise<IUser[]> => {
    const users: IUser[] = [];
    usersRepo.forEach((el) => {
      users.push(el);
    });
    return users;
  };

  /**
  * Returns one User.
  *
  * @param id - The User ID, string
  * 
  * @returns the user by id, IUser
  *
  */
  public static getOne = async (id: string): Promise<IUser | undefined> => {
    const user = usersRepo.get(id);
    return user;
  };

  /**
  * Create User.
  *
  * @param body - The User, IUser
  * 
  * @returns new user, IUser
  *
  */
  public static create = async (body: IUser): Promise<IUser | undefined> => {
    const id = uuidv4();
    usersRepo.set(id, { ...body, id });
    return usersRepo.get(id);
  };

  /**
  * Update User.
  *
  * @param id - The User ID for update, string
  * @param body - The User, IUser
  * 
  * @returns updated user, IUser
  *
  */
  public static update = async (
    id: string,
    body: IUser,
  ): Promise<IUser | undefined> => {
    const user = usersRepo.get(id);
    usersRepo.delete(id);
    usersRepo.set(id, { ...user, ...body, id });
    return usersRepo.get(id);
  };

  /**
  * Delete User.
  *
  * @param id - The User ID for delete, string
  * 
  * @returns true if successful, boolean
  *
  */
  public static destroy = async (id: string): Promise<boolean> => usersRepo.delete(id);

  /**
  * When DELETEs User, all Tasks where User is assigned
  * be updated to put userId = null.
  *
  * @param id - The User ID, string
  * 
  */
  public static deleteUserFromTask = async (id: string): Promise<void> => {
    const tasks = await TaskService.getAll();

    tasks
      .filter((task: ITask) => task.userId === id)
      .forEach(async (task: ITask) => {
        await TaskService.update(task.id, { ...task, userId: null });
      });
  };
}
