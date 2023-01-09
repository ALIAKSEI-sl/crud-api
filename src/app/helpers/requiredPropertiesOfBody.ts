import { ServerResponse } from 'node:http';
import { StatusCode, ErrorMessages } from './responseMessages';
import { IPropertiesOfBody } from './model.propertiesOfBody';

export function requiredPropertiesOfBody(response: ServerResponse, body: IPropertiesOfBody) {
  const { username, age, hobbies } = body;
  console.log(body);
  try {
    if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
      response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.requiredFields }));
    }
    if (hobbies.length > 0) {
      if (!hobbies.some(elem => typeof elem === 'string')) {
        response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.requiredFields }));
      }
    }
  } catch {
    response.writeHead(StatusCode.internalServerError, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
  }
}