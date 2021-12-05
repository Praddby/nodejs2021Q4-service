const usersService = require('../services/user.service');

const getAll = async (request, reply) => {
  const users = await usersService.getAll();

  reply.send(users);
};

const getOne = async (request, reply) => {
  const { userId } = request.params;

  const isHasUser = await usersService.hasUser(userId);

  if (!isHasUser) {
    reply.callNotFound();
    return;
  }

  const user = await usersService.getOne(userId);

  reply.send(user);
};

const create = async (request, reply) => {
  const user = await usersService.create(request.body);

  reply.code(201).send(user);
};

const update = async (request, reply) => {
  const { userId } = request.params;

  const isHasUser = await usersService.hasUser(userId);

  if (!isHasUser) {
    reply.callNotFound();
    return;
  }

  const user = await usersService.update(userId, request.body);

  reply.send(user);
};

const destroy = async (request, reply) => {
  const { userId } = request.params;

  const isHasUser = await usersService.hasUser(userId);

  if (!isHasUser) {
    reply.callNotFound();
    return;
  }

  await usersService.destroy(userId);

  await usersService.deleteUserFromTask(userId);

  reply.code(204).send();
};

module.exports = { getAll, getOne, create, update, destroy };
