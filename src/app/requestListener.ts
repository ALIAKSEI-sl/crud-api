import { IncomingMessage, ServerResponse } from 'node:http';

export function requestListener(req: IncomingMessage, res: ServerResponse) {
  const [api, users, id, ...rest] = req.url.split('/').filter(Boolean);
  res.setHeader('Content-Type', 'application/json');
  if (api === 'api' && users === 'users' && rest.length === 0) {
    try {
      switch (req.method) {
        case 'GET':
          break;
        case 'POST':
          break;
        case 'PUT':
          break;
        case 'DELETE':
          break;
        default:
      }
    } catch {

    }
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
}