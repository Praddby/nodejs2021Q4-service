const tasksService = require('../services/task.service');

const getAll = async (request, reply) => {
  const { boardId } = request.params;

  const tasks = await tasksService.getAllForBoard(boardId);

  reply.send(tasks);
};

const getOne = async (request, reply) => {
  const { taskId } = request.params;

  const isHasTask = await tasksService.hasTask(taskId);

  if (!isHasTask) {
    reply.callNotFound();
    return;
  }

  const task = await tasksService.getOne(taskId);

  reply.send(task);
};

const create = async (request, reply) => {
  const { boardId } = request.params;

  const task = await tasksService.create(boardId, request.body);

  reply.code(201).send(task);
};

const update = async (request, reply) => {
  const { taskId } = request.params;

  const isHasTask = await tasksService.hasTask(taskId);

  if (!isHasTask) {
    reply.callNotFound();
    return;
  }

  const task = await tasksService.update(taskId, request.body);

  reply.send(task);
};

const destroy = async (request, reply) => {
  const { taskId } = request.params;

  const isHasTask = await tasksService.hasTask(taskId);

  if (!isHasTask) {
    reply.callNotFound();
    return;
  }

  await tasksService.destroy(taskId);

  reply.code(204).send();
};

module.exports = { getAll, getOne, create, update, destroy };
