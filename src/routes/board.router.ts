import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { BoardController } from '../controllers';
import { BoardSchema } from '../schemas';

/**
  * Fastify Router Shorthand method type that is similar to the Express/Restify approach
  *
  * @param fastify - FastifyRequest is an instance of the standard http or http2 request objects, FastifyInstance
  * 
  */
export default async (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  /**
   * Method: GET, path: /boards
   */
  fastify.get('/', { schema: BoardSchema.getAll }, BoardController.getAll);

  /**
   * Method: GET, path: /boards/:boardId
   */
  fastify.get(
    '/:boardId',
    { schema: BoardSchema.getOne },
    BoardController.getOne
  );

  /**
   * Method: POST, path: /boards
   */
  fastify.post('/', { schema: BoardSchema.create }, BoardController.create);

  /**
   * Method: PUT, path: /boards/:boardId
   */
  fastify.put(
    '/:boardId',
    { schema: BoardSchema.update },
    BoardController.update
  );

  /**
   * Method: DELETE, path: /boards/:boardId
   */
  fastify.delete(
    '/:boardId',
    { schema: BoardSchema.destroy },
    BoardController.destroy
  );
};

export const autoPrefix = '/boards';
