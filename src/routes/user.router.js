const usersSchema = require('../schemas/user.schema');
const usersController = require('../controllers/user.controller');

module.exports = async (fastify) => {
  fastify.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: usersSchema.getAll }, usersController.getAll);

  fastify.get(
    '/:userId',
    { schema: usersSchema.getOne },
    usersController.getOne
  );

  fastify.post('/', { schema: usersSchema.create }, usersController.create);

  fastify.put(
    '/:userId',
    { schema: usersSchema.update },
    usersController.update
  );

  fastify.delete(
    '/:userId',
    { schema: usersSchema.destroy },
    usersController.destroy
  );
};

module.exports.autoPrefix = '/users';
