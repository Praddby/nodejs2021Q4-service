import { FastifyReply, FastifyRequest } from 'fastify';
import { IBoard } from '../repositories';
import { BoardService } from '../services';

interface IParams {
  boardId: string;
}

export class BoardController {

  /**
  * Send array Board.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static getAll = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const boards = await BoardService.getAll();

    reply.send(boards);
  };

  /**
  * Send one Board by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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

  /**
  * Send new Board and code 201.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
  public static create = async (
    request: FastifyRequest<{ Body: IBoard }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const board = await BoardService.create(request.body);

    reply.code(201).send(board);
  };

  /**
  * Send update Board by id.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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

  /**
  * Delete Board and all task of this board, and send code 204.
  *
  * @param request - FastifyRequest is an instance of the standard http or http2 request objects, FastifyRequest
  * @param reply - FastifyReply is an instance of the standard http or http2 reply types., FastifyReply
  * 
  */
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
