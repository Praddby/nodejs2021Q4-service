import { IColumn } from './column.repository';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export const boardsRepo = new Map<string, IBoard>();
