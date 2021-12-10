import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TaskController } from '../controllers';
import { TaskSchema } from '../schemas';

export default async (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested user does not exist' });
  });

  fastify.get('/', { schema: TaskSchema.getAll }, TaskController.getAll);

  fastify.get(
    '/:taskId',
    { schema: TaskSchema.getOne },
    TaskController.getOne
  );

  fastify.post('/', { schema: TaskSchema.create }, TaskController.create);

  fastify.put(
    '/:taskId',
    { schema: TaskSchema.update },
    TaskController.update
  );

  fastify.delete(
    '/:taskId',
    { schema: TaskSchema.destroy },
    TaskController.destroy
  );
};

export const autoPrefix = '/boards/:boardId/tasks';
