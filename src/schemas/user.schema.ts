const User = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    login: { type: 'string' },
    _password: { type: 'string' },
  },
};

export class UserSchema {
  public static getAll = {
    description: 'Returns array users',
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  };

  public static getOne = {
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

  public static create = {
    description: 'Createds user and returns him',
    response: {
      201: User,
    },
    body: User,
  };

  public static update = {
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

  public static destroy = {
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
}
