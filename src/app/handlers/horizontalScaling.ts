import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { server, port } from '../server';

export function createHorizontalScaling() {
  if (cluster.isPrimary) {
    const numCpus = cpus().length;
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });

    cluster.on('message', async (worker, message) => {
      // if (message.cmd in usersRepository) {
      //   const data = await usersRepository[message.cmd](...message.data);
      //   worker.send({ cmd: message.cmd, data });
      // }
    });
  } else {
    server.listen(port, () => {
      console.log(`Worker ${process.pid} started`);
    });

    // process.on('message', (message) => {
    //   usersRepository.emit(message['cmd'], message);
    // });
  }
}