import supertest from 'supertest';
import { server } from '../app/server';
import { StatusCode, ErrorMessages } from '../app/helpers/responseMessages';
import { IUser } from '../app/user/user.model';

const endpoint = '/api/users';

describe('first scenario', () => {
  const user: IUser = {
    username: 'David',
    age: 18,
    hobbies: ['soccer', 'music'],
  };

  it('should return empty array', async () => {
    const expected = [];
    const response = await supertest(server).get(endpoint);

    expect(response.statusCode).toBe(StatusCode.ok);
    expect(response.body).toEqual(expected);
  });

  it('should create new user and return it', async () => {
    const response = await supertest(server).post(endpoint).send(user);

    expect(response.statusCode).toBe(StatusCode.created);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.id).not.toBe('');
    expect(response.body.username).toBe(user.username);
    expect(response.body.age).toBe(user.age);

    user.id = response.body.id;
  });

  it('should return by id', async () => {
    const response = await supertest(server).get(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.ok);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.username).toBe(user.username);
    expect(response.body.age).toBe(user.age);
    expect(response.body.id).toBe(user.id);
  });

  it('should update user', async () => {
    const updateUser = {
      username: 'Mark',
      age: 22,
      hobbies: [],
    };
    console.log(user.id);
    const response = await supertest(server).put(`${endpoint}/${user.id}`).send(updateUser);

    expect(response.statusCode).toBe(StatusCode.ok);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.username).toBe(updateUser.username);
    expect(response.body.age).toBe(updateUser.age);
    expect(response.body.hobbies.length).toBe(0);
  });

  it('should delete user by id', async () => {
    const response = await supertest(server).delete(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.noContent);
  });

  it('should return message that', async () => {
    const response = await supertest(server).get(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.notFound);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.nonExistentUser);
  });
});

describe('second scenario', () => {

});

describe('third scenario', () => {

});