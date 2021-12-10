import { FastifyReply, FastifyRequest } from 'fastify';
import { IBoard } from '../repositories';
import { BoardService } from '../services';

interface IParams {
  boardId: string;
}

export class BoardController {
  public static getAll = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const boards = await BoardService.getAll();

    reply.send(boards);
  };

  public static getOne = async (
    request: FastifyRequest<{ Params: IParams }>, 
    reply: FastifyReply,
  ): Promise<void> => {
    const { boardId } = request.params;

    const isHasBoard = await BoardService.hasBoard(boardId);

    if (!isHasBoard) {
      reply.callNotFound();
      return;
    }

    const board = await BoardService.getOne(boardId);

    reply.send(board);
  };

  public static create = async (
    request: FastifyRequest<{ Body: IBoard }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const board = await BoardService.create(request.body);

    reply.code(201).send(board);
  };

  public static update = async (
    request: FastifyRequest<{ Params: IParams, Body: IBoard }>,
    reply: FastifyReply,
  ) => {
    const { boardId } = request.params;

    const isHasBoard = await BoardService.hasBoard(boardId);

    if (!isHasBoard) {
      reply.callNotFound();
      return;
    }

    const board = await BoardService.update(boardId, request.body);

    reply.send(board);
  };

  public static destroy = async (
    request: FastifyRequest<{ Params: IParams }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { boardId } = request.params;

    const isHasBoard = await BoardService.hasBoard(boardId);

    if (!isHasBoard) {
      reply.callNotFound();
      return;
    }

    await BoardService.destroy(boardId);

    await BoardService.deleteTasksOnBoard(boardId);

    reply.code(204).send();
  };
}
