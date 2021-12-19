const boardsSchema = require('../schemas/board.schema');
const boardsController = require('../controllers/board.controller');

module.exports = async (fastify) => {
  fastify.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: boardsSchema.getAll }, boardsController.getAll);

  fastify.get(
    '/:boardId',
    { schema: boardsSchema.getOne },
    boardsController.getOne
  );

  fastify.post('/', { schema: boardsSchema.create }, boardsController.create);

  fastify.put(
    '/:boardId',
    { schema: boardsSchema.update },
    boardsController.update
  );

  fastify.delete(
    '/:boardId',
    { schema: boardsSchema.destroy },
    boardsController.destroy
  );
};

module.exports.autoPrefix = '/boards';
