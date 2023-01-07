import { IncomingMessage } from 'node:http';

export function getBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      resolve(body);
    });
  });
}