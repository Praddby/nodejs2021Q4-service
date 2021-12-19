const { v4: uuidv4 } = require('uuid');
const { usersRepo } = require('../repositories');
const tasksService = require('./task.service');

const hasUser = async (id) => {
  const user = usersRepo.has(id);
  return user;
};

const getAll = async () => {
  const users = [];
  usersRepo.forEach((el) => {
    users.push(el);
  });
  return users;
};

const getOne = async (id) => {
  const user = usersRepo.get(id);
  return user;
};

const create = async (body) => {
  const id = uuidv4();
  usersRepo.set(id, { id, ...body });
  return usersRepo.get(id);
};

const update = async (id, body) => {
  const user = usersRepo.get(id);
  usersRepo.delete(id);
  usersRepo.set(id, { id, ...user, ...body });
  return usersRepo.get(id);
};

const destroy = async (id) => usersRepo.delete(id);

const deleteUserFromTask = async (id) => {
  const tasks = await tasksService.getAll();

  tasks
    .filter((task) => task.userId === id)
    .forEach(async (task) => {
      await tasksService.update(task.id, { userId: null });
    });
};

module.exports = {
  hasUser,
  getAll,
  getOne,
  create,
  update,
  destroy,
  deleteUserFromTask,
};
