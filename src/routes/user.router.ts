import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserController } from '../controllers';
import { UserSchema } from '../schemas';

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
   * Method: GET, path: /users
   */
  fastify.get('/', { schema: UserSchema.getAll }, UserController.getAll);

  /**
   * Method: GET, path: /users/:userId
   */
  fastify.get(
    '/:userId',
    { schema: UserSchema.getOne },
    UserController.getOne
  );

  /**
   * Method: POST, path: /users
   */
  fastify.post('/', { schema: UserSchema.create }, UserController.create);

  /**
   * Method: PUT, path: /users/:userId
   */
  fastify.put(
    '/:userId',
    { schema: UserSchema.update },
    UserController.update
  );
  
  /**
   * Method: DELETE, path: /users/:userId
   */
  fastify.delete(
    '/:userId',
    { schema: UserSchema.destroy },
    UserController.destroy
  );
};

export const autoPrefix = '/users';
