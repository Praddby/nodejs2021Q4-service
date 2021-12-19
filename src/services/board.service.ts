import { v4 as uuidv4 } from 'uuid';
import { boardsRepo, IBoard, ITask } from '../repositories';
import { TaskService } from './task.service';

export class BoardService {

 /**
  * Сhecks the availability of the board.
  *
  * @param id - The Board ID, string
  * 
  * @returns Whether the board was found by id, boolean
  *
  */
  public static hasBoard = async (id: string): Promise<boolean> => {
    const board = boardsRepo.has(id);
    return board;
  };

  /**
  * Returns array of Board.
  *
  * @returns all boards, Array<IBoard>
  *
  */
  public static getAll = async (): Promise<IBoard[]> => {
    const boards: IBoard[] = [];

    boardsRepo.forEach((el) => {
      boards.push(el);
    });

    return boards;
  };

 /**
  * Returns one Board.
  *
  * @param id - The Board ID, string
  * 
  * @returns the board by id, IBoard
  *
  */
  public static getOne = async (id: string): Promise<IBoard | undefined> => {
    const board: IBoard |undefined = boardsRepo.get(id);

    return board;
  };

 /**
  * Create Board.
  *
  * @param body - The Board, IBoard
  * 
  * @returns new board, IBoard
  *
  */
  public static create = async (body: IBoard): Promise<IBoard | undefined> => {
    const id = uuidv4();
    boardsRepo.set(id, { ...body, id });
    
    return boardsRepo.get(id);
  };

 /**
  * Update Board.
  *
  * @param id - The Board ID for update, string
  * @param body - The Board, IBoard
  * 
  * @returns updated board, IBoard
  *
  */
  public static update = async (id: string, body: IBoard): Promise<IBoard | undefined> => {
    const board = boardsRepo.get(id);
    boardsRepo.delete(id);
    boardsRepo.set(id, { ...board, ...body, id });

    return boardsRepo.get(id);
  };

 /**
  * Delete Board.
  *
  * @param id - The Board ID for delete, string
  * 
  * @returns true if successful, boolean
  *
  */
  public static destroy = async (id: string): Promise<boolean> => boardsRepo.delete(id);

 /**
  * When the Board is deleted, all its tasks are also deleted.
  *
  * @param id - The Board ID, string
  * 
  */
  public static deleteTasksOnBoard = async (id: string): Promise<void> => {
    const tasks = await TaskService.getAllForBoard(id);

    tasks.forEach(async (task: ITask) => {
      await TaskService.destroy(task.id);
    });
 };
}
