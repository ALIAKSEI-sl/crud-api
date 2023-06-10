import { createServer } from 'node:http';
import { requestListener } from './handlers/requestListener';
import { getArguments } from './helpers/arguments';
import { createHorizontalScaling } from './handlers/horizontalScaling';
import 'dotenv/config';

export const port = process.env.PORT || 4000;
export const server = createServer(requestListener);
const arg = getArguments();
const key = 'horizontalScaling';

export function startServer() {
  if (arg[key] === 'enable') {
    createHorizontalScaling();
  } else {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}