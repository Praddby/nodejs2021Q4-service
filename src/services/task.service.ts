import { v4 as uuidv4 } from 'uuid';
import { tasksRepo, ITask } from '../repositories';

export class TaskService {

  /**
  * Сhecks the availability of the task.
  *
  * @param id - The Task ID, string
  * 
  * @returns Whether the task was found by id, boolean
  *
  */
  public static hasTask = async (id: string): Promise<boolean> => {
    const task = tasksRepo.has(id);

    return task;
  };

  /**
  * Returns array of Task.
  *
  * @returns all boards, Array<ITask>
  *
  */
  public static getAll = async (): Promise<ITask[]> => {
    const tasks: ITask[] = [];

    tasksRepo.forEach((el) => {
      tasks.push(el);
    });

    return tasks;
  };

  /**
  * Returns one Board.
  *
  * @param boardId - The Board ID, string
  * 
  * @returns all tasks by id board, Array<ITask>
  *
  */
  public static getAllForBoard = async (boardId: string): Promise<ITask[]> => {
    const tasks: ITask[] = [];

    tasksRepo.forEach((el) => {
      if (el.boardId === boardId) {
        tasks.push(el);
      }
    });

    return tasks;
  };

  /**
  * Returns one Task.
  *
  * @param id - The Task ID, string
  * 
  * @returns the board by id, IBoard
  *
  */
  public static getOne = async (id: string): Promise<ITask | undefined> => {
    const task = tasksRepo.get(id);

    return task;
  };

  /**
  * Create Task.
  *
  * @param boardId - The Board ID, string
  * @param body - The Task, ITask
  * 
  * @returns new task, ITask
  *
  */
  public static create = async (boardId: string, body: ITask): Promise<ITask | undefined> => {
    const id = uuidv4();
    tasksRepo.set(id, { ...body, boardId, id });

    return tasksRepo.get(id);
  };

  /**
  * Update Task.
  *
  * @param id - The Task ID for update, string
  * @param body - The Task, ITask
  * 
  * @returns updated task, ITask
  *
  */
  public static update = async (id: string, body: ITask): Promise<ITask | undefined> => {
    const task = tasksRepo.get(id);
    tasksRepo.delete(id);
    tasksRepo.set(id, { ...task, ...body, id });

    return tasksRepo.get(id);
  };

  /**
  * Delete Task.
  *
  * @param id - The Task ID for delete, string
  * 
  * @returns true if successful, boolean
  *
  */
  public static destroy = async (id: string): Promise<boolean> => tasksRepo.delete(id);
}
