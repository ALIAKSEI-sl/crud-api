import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCode, ErrorMessages } from '../helpers/responseMessages';
import { controller } from './controller';

export async function requestListener(request: IncomingMessage, response: ServerResponse) {
  try {
    const { url, method } = request;
    const [api, users, id, ...rest] = url.split('/').filter(Boolean);

    if (api === 'api' && users === 'users' && rest.length === 0) {

      switch (method) {
        case 'GET':
          if (id) {
            controller.getUser(response, id);
          } else {
            controller.getAllUser(response);
          }
          break;
        case 'POST':
          if (id) {
            response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
          } else {
            controller.createUser(request, response);
          }
          break;
        case 'PUT':
          if (id) {
            controller.updateUser(request, response, id);
          } else {
            response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
          }
          break;
        case 'DELETE':
          if (id) {
            controller.deleteUser(response, id);
          } else {
            response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
          }
          break;
        default:
          response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.unsupportedMethod }));
      }

    } else {
      response.writeHead(StatusCode.notFound, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
    }
  } catch {
    response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
  }
}