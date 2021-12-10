import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserController } from '../controllers';
import { UserSchema } from '../schemas';

export default async (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: UserSchema.getAll }, UserController.getAll);

  fastify.get(
    '/:userId',
    { schema: UserSchema.getOne },
    UserController.getOne
  );

  fastify.post('/', { schema: UserSchema.create }, UserController.create);

  fastify.put(
    '/:userId',
    { schema: UserSchema.update },
    UserController.update
  );

  fastify.delete(
    '/:userId',
    { schema: UserSchema.destroy },
    UserController.destroy
  );
};

export const autoPrefix = '/users';
