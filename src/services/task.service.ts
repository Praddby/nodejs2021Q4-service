import { v4 as uuidv4 } from 'uuid';
import { tasksRepo, ITask } from '../repositories';

export class TaskService {
  public static hasTask = async (id: string): Promise<boolean> => {
    const task = tasksRepo.has(id);

    return task;
  };

  public static getAll = async (): Promise<ITask[]> => {
    const tasks: ITask[] = [];

    tasksRepo.forEach((el) => {
      tasks.push(el);
    });

    return tasks;
  };

  public static getAllForBoard = async (boardId: string): Promise<ITask[]> => {
    const tasks: ITask[] = [];

    tasksRepo.forEach((el) => {
      if (el.boardId === boardId) {
        tasks.push(el);
      }
    });

    return tasks;
  };

  public static getOne = async (id: string): Promise<ITask | undefined> => {
    const task = tasksRepo.get(id);

    return task;
  };

  public static create = async (boardId: string, body: ITask): Promise<ITask | undefined> => {
    const id = uuidv4();
    tasksRepo.set(id, { ...body, boardId, id });

    return tasksRepo.get(id);
  };

  public static update = async (id: string, body: ITask): Promise<ITask | undefined> => {
    const task = tasksRepo.get(id);
    tasksRepo.delete(id);
    tasksRepo.set(id, { ...task, ...body, id });

    return tasksRepo.get(id);
  };

  public static destroy = async (id: string): Promise<boolean> => tasksRepo.delete(id);
}
