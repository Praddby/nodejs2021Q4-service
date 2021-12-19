const tasksSchema = require('../schemas/tasks.schema');
const tasksController = require('../controllers/task.controller');

module.exports = async (fastify) => {
  fastify.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: tasksSchema.getAll }, tasksController.getAll);

  fastify.get(
    '/:taskId',
    { schema: tasksSchema.getOne },
    tasksController.getOne
  );

  fastify.post('/', { schema: tasksSchema.create }, tasksController.create);

  fastify.put(
    '/:taskId',
    { schema: tasksSchema.update },
    tasksController.update
  );

  fastify.delete(
    '/:taskId',
    { schema: tasksSchema.destroy },
    tasksController.destroy
  );
};

module.exports.autoPrefix = '/boards/:boardId/tasks';
