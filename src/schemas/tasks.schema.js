const Task = {
  type: 'object',
  required: ['title', 'order', 'description', 'boardId'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    boardId: { type: 'string' },
    userId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
};

const getAll = {
  description: 'Returns array tasks',
  response: {
    200: {
      type: 'array',
      items: Task,
    },
  },
};

const getOne = {
  description: 'Returns task by id',
  response: {
    200: Task,
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
  description: 'Createds task and returns him',
  response: {
    201: Task,
  },
  body: Task,
};

const update = {
  description: 'Updateds task and returns him',
  response: {
    200: Task,
  },
  body: Task,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
};

const destroy = {
  description: 'Removes task by id',
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
