import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCode, ErrorMessages } from '../helpers/responseMessages';
import { requiredPropertiesOfBody } from '../helpers/requiredPropertiesOfBody';
import { getBody } from '../helpers/getBody';
import { checkId } from '../helpers/checkId';
import { user } from '../user/user';

export class Controller {
  getUser(response: ServerResponse, id: string) {
    try {
      const idIsExist = checkId(response, id);
      if (idIsExist) {
        const userById = user.findById(id);
        response.writeHead(StatusCode.ok, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(userById));
      }
    } catch {
      response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    }
  }

  getAllUser(response: ServerResponse) {
    try {
      const allUsers = user.findAll();
      response.writeHead(StatusCode.ok, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(allUsers));
    } catch {
      response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    }
  }

  async createUser(request: IncomingMessage, response: ServerResponse) {
    try {
      const body = await getBody(request, response);
      const propertiesIsRequired = requiredPropertiesOfBody(response, body);
      if (propertiesIsRequired) {
        const newUser = user.create(body);
        response.writeHead(StatusCode.created, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(newUser));
      }
    } catch {
      response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    }
  }

  async updateUser(request: IncomingMessage, response: ServerResponse, id: string) {
    try {
      const idIsExist = checkId(response, id);
      if (idIsExist) {
        const body = await getBody(request, response);
        const propertiesIsRequired = requiredPropertiesOfBody(response, body);
        if (propertiesIsRequired) {
          const updateUser = user.update(id, body);
          response.writeHead(StatusCode.ok, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(updateUser));
        }
      }
    } catch {
      response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    }
  }

  deleteUser(response: ServerResponse, id: string) {
    try {
      const idIsExist = checkId(response, id);
      if (idIsExist) {
        const deleteUser = user.delete(id);
        response.writeHead(StatusCode.noContent, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deleteUser));
      }
    } catch {
      response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    }
  }
}

export const controller = new Controller();