import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../repositories';
import { UserService } from '../services';

interface IParams {
  userId: string;
}

export class UserController {

  /**
  * Send array User.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await UserService.getAll();

    reply.send(users);
  };

  /**
  * Send one User by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static getOne = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { userId } = request.params;

    const isHasUser = await UserService.hasUser(userId);

    if (!isHasUser) {
      reply.callNotFound();
      return;
    }

    const user = await UserService.getOne(userId);

    reply.send(user);
  };

  /**
  * Send new User and code 201.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static create = async (request: FastifyRequest<{ Params: IParams, Body: IUser }>, reply: FastifyReply) => {
    const user = await UserService.create(request.body);

    reply.code(201).send(user);
  };

  /**
  * Send update User by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static update = async (request: FastifyRequest<{ Params: IParams,Body: IUser }>, reply: FastifyReply) => {
    const { userId } = request.params;

    const isHasUser = await UserService.hasUser(userId);

    if (!isHasUser) {
      reply.callNotFound();
      return;
    }

    const user = await UserService.update(userId, request.body);

    reply.send(user);
  };

  /**
  * Delete User and update all task of this user, and send code 204.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static destroy = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { userId } = request.params;

    const isHasUser = await UserService.hasUser(userId);

    if (!isHasUser) {
      reply.callNotFound();
      return;
    }

    await UserService.destroy(userId);

    await UserService.deleteUserFromTask(userId);

    reply.code(204).send();
  };
}
