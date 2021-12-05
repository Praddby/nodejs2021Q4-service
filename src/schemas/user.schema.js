const User = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    _password: { type: 'string' },
  },
};

const getAll = {
  description: 'Returns array users',
  response: {
    200: {
      type: 'array',
      items: User,
    },
  },
};

const getOne = {
  description: 'Returns user by id',
  response: {
    200: User,
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
  description: 'Createds user and returns him',
  response: {
    201: User,
  },
  body: User,
};

const update = {
  description: 'Updateds user and returns him',
  response: {
    200: User,
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  body: User,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
};

const destroy = {
  description: 'Removes user by id',
  response: {
    204: {
      type: 'object',
    },
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

module.exports = { getAll, getOne, create, update, destroy };
