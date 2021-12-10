import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { BoardController } from '../controllers';
import { BoardSchema } from '../schemas';

export default async (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: BoardSchema.getAll }, BoardController.getAll);

  fastify.get(
    '/:boardId',
    { schema: BoardSchema.getOne },
    BoardController.getOne
  );

  fastify.post('/', { schema: BoardSchema.create }, BoardController.create);

  fastify.put(
    '/:boardId',
    { schema: BoardSchema.update },
    BoardController.update
  );

  fastify.delete(
    '/:boardId',
    { schema: BoardSchema.destroy },
    BoardController.destroy
  );
};

export const autoPrefix = '/boards';
