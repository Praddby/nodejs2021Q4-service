export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId: string | null;
  userId: string | null;
  columnId: string | null;
}

export const tasksRepo = new Map<string, ITask>();
