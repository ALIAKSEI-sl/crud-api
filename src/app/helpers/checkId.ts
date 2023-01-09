import { ServerResponse } from 'node:http';
import { validate as uuidValidate } from 'uuid';
import { StatusCode, ErrorMessages } from '../helpers/responseMessages';
import dataBase from '../user/dataBase.json';

export function checkId(response: ServerResponse, id: string) {
  if (!uuidValidate(id)) {
    response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.notUuid }));
  }
  if (!dataBase.find((user) => user.id === id)) {
    response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentUser }));
  }
}