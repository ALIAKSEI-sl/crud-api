import { ServerResponse } from 'node:http';
import { validate as uuidValidate } from 'uuid';
import { StatusCode, ErrorMessages } from '../helpers/responseMessages';
import { dataBase } from '../user/user';

export function checkId(response: ServerResponse, id: string) {
  try {
    if (!uuidValidate(id)) {
      response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.notUuid }));
      return false;
    }
    if (!dataBase.find((user) => user.id === id)) {
      response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentUser }));
      return false;
    }
  } catch {
    response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    return false;
  }
  return true;
}