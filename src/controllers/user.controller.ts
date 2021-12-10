import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../repositories';
import { UserService } from '../services';

interface IParams {
  userId: string;
}

export class UserController {
  public static getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await UserService.getAll();

    reply.send(users);
  };

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

  public static create = async (request: FastifyRequest<{ Params: IParams, Body: IUser }>, reply: FastifyReply) => {
    const user = await UserService.create(request.body);

    reply.code(201).send(user);
  };

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
