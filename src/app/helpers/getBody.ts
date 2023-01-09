import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCode, ErrorMessages } from '../helpers/responseMessages';
import { IPropertiesOfBody } from './model.propertiesOfBody';

export function getBody(request: IncomingMessage, response: ServerResponse): Promise<IPropertiesOfBody> {
  return new Promise((resolve) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        const bodyParse = JSON.parse(body);
        resolve(bodyParse);
      } catch {
        response.writeHead(StatusCode.badRequest, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.invalidJson }));
      }
    });
  });
}