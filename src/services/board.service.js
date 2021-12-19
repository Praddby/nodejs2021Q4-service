const { v4: uuidv4 } = require('uuid');
const { boardsRepo } = require('../repositories');
const tasksService = require('./task.service');

const hasBoard = async (id) => {
  const board = boardsRepo.has(id);
  return board;
};

const getAll = async () => {
  const boards = [];

  boardsRepo.forEach((el) => {
    boards.push(el);
  });

  return boards;
};

const getOne = async (id) => {
  const board = boardsRepo.get(id);

  return board;
};

const create = async (body) => {
  const id = uuidv4();
  boardsRepo.set(id, { id, ...body });

  return boardsRepo.get(id);
};

const update = async (id, body) => {
  const board = boardsRepo.get(id);
  boardsRepo.delete(id);
  boardsRepo.set(id, { id, ...board, ...body });

  return boardsRepo.get(id);
};

const destroy = async (id) => boardsRepo.delete(id);

const deleteTasksOnBoard = async (id) => {
  const tasks = await tasksService.getAllForBoard(id);

  tasks.forEach(async (task) => {
    await tasksService.destroy(task.id);
  });
};

module.exports = {
  hasBoard,
  getAll,
  getOne,
  create,
  update,
  destroy,
  deleteTasksOnBoard,
};
