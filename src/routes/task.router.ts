import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TaskController } from '../controllers';
import { TaskSchema } from '../schemas';

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
   * Method: GET, path: /boards/:boardId/tasks
   */
  fastify.get('/', { schema: TaskSchema.getAll }, TaskController.getAll);

  /**
   * Method: GET, path: /boards/:boardId/tasks/:taskId
   */
  fastify.get(
    '/:taskId',
    { schema: TaskSchema.getOne },
    TaskController.getOne
  );

  /**
   * Method: POST, path: /boards/:boardId/tasks
   */
  fastify.post('/', { schema: TaskSchema.create }, TaskController.create);

  /**
   * Method: PUT, path: /boards/:boardId/tasks/:taskId
   */
  fastify.put(
    '/:taskId',
    { schema: TaskSchema.update },
    TaskController.update
  );

  /**
   * Method: DELETE, path: /boards/:boardId/tasks/:taskId
   */
  fastify.delete(
    '/:taskId',
    { schema: TaskSchema.destroy },
    TaskController.destroy
  );
};

export const autoPrefix = '/boards/:boardId/tasks';
