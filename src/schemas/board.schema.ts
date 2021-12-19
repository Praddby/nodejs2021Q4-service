import { Column } from './column.schema';

const Board = {
  type: 'object',
  required: ['title'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: Column,
    },
  },
};

export class BoardSchema {
  public static getAll = {
    description: 'Returns array boards',
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  };

  public static getOne = {
    description: 'Returns board by id',
    response: {
      200: Board,
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  };

  public static create = {
    description: 'Createds board and returns him',
    response: {
      201: Board,
    },
    body: Board,
  };

  public static update = {
    description: 'Updateds board and returns him',
    response: {
      200: Board,
    },
    body: Board,
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  };

  public static destroy = {
    description: 'Removes board by id',
    response: {
      204: {
        type: 'object',
      },
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  };
}
