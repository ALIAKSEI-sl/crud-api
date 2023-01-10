import { createServer } from 'node:http';
import { requestListener } from './handlers/requestListener';
import 'dotenv/config';

const port = process.env.PORT || 4000;
export const server = createServer(requestListener);

export function startServer() {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}