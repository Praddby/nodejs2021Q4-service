import { v4 as uuidv4 } from 'uuid';
import { boardsRepo, IBoard, ITask } from '../repositories';
import { TaskService } from './task.service';

export class BoardService {
  public static hasBoard = async (id: string): Promise<boolean> => {
    const board = boardsRepo.has(id);
    return board;
  };

  public static getAll = async (): Promise<IBoard[]> => {
    const boards: IBoard[] = [];

    boardsRepo.forEach((el) => {
      boards.push(el);
    });

    return boards;
  };

  public static getOne = async (id: string): Promise<IBoard | undefined> => {
    const board: IBoard |undefined = boardsRepo.get(id);

    return board;
  };

  public static create = async (body: IBoard): Promise<IBoard | undefined> => {
    const id = uuidv4();
    boardsRepo.set(id, { ...body, id });
    
    return boardsRepo.get(id);
  };

  public static update = async (id: string, body: IBoard): Promise<IBoard | undefined> => {
    const board = boardsRepo.get(id);
    boardsRepo.delete(id);
    boardsRepo.set(id, { ...board, ...body, id });

    return boardsRepo.get(id);
  };

  public static destroy = async (id: string): Promise<boolean> => boardsRepo.delete(id);

  public static deleteTasksOnBoard = async (id: string): Promise<void> => {
    const tasks = await TaskService.getAllForBoard(id);

    tasks.forEach(async (task: ITask) => {
      await TaskService.destroy(task.id);
    });
 };
}
