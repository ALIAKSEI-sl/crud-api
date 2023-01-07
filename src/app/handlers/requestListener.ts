import { IncomingMessage, ServerResponse } from 'node:http';
import { checkEndpoint } from '../helpers/checkEndpoint';

export async function requestListener(request: IncomingMessage, response: ServerResponse) {
  const { url, method } = request;
  const doesExistEndpoint = checkEndpoint(url, method);

  if (doesExistEndpoint.flag) {
    //const [, , id] = url.split('/').filter(Boolean);

    switch (method) {
      case 'GET': console.log('GET');
        response.writeHead(200);
        response.end(JSON.stringify({ code: 200, message: 'hi' }));
        //controller.getAllUser(request, response);
        break;
      case 'POST': console.log('POST'); //controller.createUser(request, response);
        response.writeHead(200);
        response.end(JSON.stringify({ code: 200, message: 'hi' }));
        break;
      case 'PUT': console.log('PUT');
        response.writeHead(200);
        response.end(JSON.stringify({ code: 200, message: 'hi' }));
        break;
      case 'DELETE': console.log('DELETE');
        response.writeHead(200);
        response.end(JSON.stringify({ code: 200, message: 'hi' }));
        break;
      default:
    }
  } else {
    response.writeHead(doesExistEndpoint.code);
    response.end(JSON.stringify({ code: doesExistEndpoint.code, message: doesExistEndpoint.message }));
  }

}

//const body = await getBody(request);
//console.log(JSON.parse(body));
//response.setHeader('Content-Type', 'application/json');
//response.writeHead(200);
//response.end(body);
