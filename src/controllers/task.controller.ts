import { FastifyReply, FastifyRequest } from 'fastify';
import { ITask } from '../repositories';
import { TaskService } from '../services';

interface IParams {
  taskId: string;
  boardId: string;
}

export class TaskController {
  
  /**
  * Send array Task.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static getAll = async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { boardId } = request.params;

    const tasks = await TaskService.getAllForBoard(boardId);

    reply.send(tasks);
  };

  /**
  * Send one Task by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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

  /**
  * Send new Task and code 201.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static create = async (request: FastifyRequest<{ Params: IParams, Body: ITask }>, reply: FastifyReply) => {
    const { boardId } = request.params;

    const task = await TaskService.create(boardId, request.body);

    reply.code(201).send(task);
  };

  /**
  * Send update Task by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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

  /**
  * Delete Task by id, and send code 204.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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
