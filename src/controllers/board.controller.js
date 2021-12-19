const boardsService = require('../services/board.service');

const getAll = async (request, reply) => {
  const boards = await boardsService.getAll();

  reply.send(boards);
};

const getOne = async (request, reply) => {
  const { boardId } = request.params;

  const isHasBoard = await boardsService.hasBoard(boardId);

  if (!isHasBoard) {
    reply.callNotFound();
    return;
  }

  const board = await boardsService.getOne(boardId);

  reply.send(board);
};

const create = async (request, reply) => {
  const board = await boardsService.create(request.body);

  reply.code(201).send(board);
};

const update = async (request, reply) => {
  const { boardId } = request.params;

  const isHasBoard = await boardsService.hasBoard(boardId);

  if (!isHasBoard) {
    reply.callNotFound();
    return;
  }

  const board = await boardsService.update(boardId, request.body);

  reply.send(board);
};

const destroy = async (request, reply) => {
  const { boardId } = request.params;

  const isHasBoard = await boardsService.hasBoard(boardId);

  if (!isHasBoard) {
    reply.callNotFound();
    return;
  }

  await boardsService.destroy(boardId);

  await boardsService.deleteTasksOnBoard(boardId);

  reply.code(204).send();
};

module.exports = { getAll, getOne, create, update, destroy };
