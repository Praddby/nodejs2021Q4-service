import { FastifyReply, FastifyRequest } from 'fastify';
import { ITask } from '../repositories';
import { TaskService } from '../services';

interface IParams {
  taskId: string;
  boardId: string;
}

export class TaskController {
  public static getAll = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { boardId } = request.params;

    const tasks = await TaskService.getAllForBoard(boardId);

    reply.send(tasks);
  };

  public static getOne = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { taskId } = request.params;

    const isHasTask = await TaskService.hasTask(taskId);

    if (!isHasTask) {
      reply.callNotFound();
      return;
    }

    const task = await TaskService.getOne(taskId);

    reply.send(task);
  };

  public static create = async (request: FastifyRequest<{ Params: IParams, Body: ITask }>, reply: FastifyReply) => {
    const { boardId } = request.params;

    const task = await TaskService.create(boardId, request.body);

    reply.code(201).send(task);
  };

  public static update = async (request: FastifyRequest<{ Params: IParams, Body: ITask }>, reply: FastifyReply) => {
    const { taskId } = request.params;

    const isHasTask = await TaskService.hasTask(taskId);

    if (!isHasTask) {
      reply.callNotFound();
      return;
    }

    const task = await TaskService.update(taskId, request.body);

    reply.send(task);
  };

  public static destroy = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { taskId } = request.params;

    const isHasTask = await TaskService.hasTask(taskId);

    if (!isHasTask) {
      reply.callNotFound();
      return;
    }

    await TaskService.destroy(taskId);

    reply.code(204).send();
  };
}
