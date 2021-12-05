const { v4: uuidv4 } = require('uuid');
const { tasksRepo } = require('../repositories');

const hasTask = async (id) => {
  const task = tasksRepo.has(id);
  return task;
};

const getAll = async () => {
  const tasks = [];

  tasksRepo.forEach((el) => {
    tasks.push(el);
  });

  return tasks;
};

const getAllForBoard = async (boardId) => {
  const tasks = [];

  tasksRepo.forEach((el) => {
    if (el.boardId === boardId) {
      tasks.push(el);
    }
  });

  return tasks;
};

const getOne = async (id) => {
  const task = tasksRepo.get(id);

  return task;
};

const create = async (boardId, body) => {
  const id = uuidv4();
  tasksRepo.set(id, { id, ...body, boardId });

  return tasksRepo.get(id);
};

const update = async (id, body) => {
  const task = tasksRepo.get(id);
  tasksRepo.delete(id);
  tasksRepo.set(id, { id, ...task, ...body });

  return tasksRepo.get(id);
};

const destroy = async (id) => tasksRepo.delete(id);

module.exports = {
  hasTask,
  getAllForBoard,
  getAll,
  getOne,
  create,
  update,
  destroy,
};
