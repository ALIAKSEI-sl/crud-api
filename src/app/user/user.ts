import { v4 as uuidv4 } from 'uuid';
import { IUser } from './user.model';
import dataBase from './dataBase.json';

class User {
  findAll(): IUser[] {
    return dataBase;
  }

  findById(id: string): IUser {
    const user = dataBase.find(u => u.id === id);
    return user;
  }

  create(property: Omit<IUser, 'id'>): IUser {
    const newId = uuidv4();
    const newUser = { id: newId, ...property };
    dataBase.push(newUser);
    return newUser;
  }

  update(id: string, property: Omit<IUser, 'id'>): IUser {
    const indexUser = dataBase.findIndex(u => u.id === id);
    dataBase[indexUser] = { id, ...property };
    return dataBase[indexUser];
  }

  delete(id: string): IUser {
    const indexUser = dataBase.findIndex(u => u.id === id);
    const [deleteUser] = dataBase.splice(indexUser, 1);
    return deleteUser;
  }
}

export const user = new User();