const Column = require('./column.schema');

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

const getAll = {
  description: 'Returns array boards',
  response: {
    200: {
      type: 'array',
      items: Board,
    },
  },
};

const getOne = {
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

const create = {
  description: 'Createds board and returns him',
  response: {
    201: Board,
  },
  body: Board,
};

const update = {
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

const destroy = {
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

module.exports = { getAll, getOne, create, update, destroy };
