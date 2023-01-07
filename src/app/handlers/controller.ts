import { IncomingMessage, ServerResponse } from 'node:http';
import { IUser } from '../user/user.model';
import { getBody } from '../helpers/getBody';
import  { user } from '../user/user';

export class Controller {
  getUser(request: IncomingMessage, response: ServerResponse, id: string) {
    user.findById(id);
  }

  getAllUser(request: IncomingMessage, response: ServerResponse) {
    const allUsers = user.findAll();
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(allUsers));
  }

  async createUser(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody(request);
    const { username, age, hobbies }: Omit<IUser, 'id'> = JSON.parse(body);
    const newUser = user.create({ username, age, hobbies });
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
  }

  updateUser() {

  }

  deleteUser() {

  }
}

export const controller = new Controller();