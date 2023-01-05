import { createServer } from 'node:http';
import * as dotenv from 'dotenv';
import { requestListener } from './requestListener';

dotenv.config();

const port = process.env.PORT;
const server = createServer(requestListener);

export function startServer() {
  server.listen(port);
}