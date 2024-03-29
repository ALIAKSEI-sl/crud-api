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
    const updateUser: IUser = {
      username: 'Mark',
      age: 22,
      hobbies: [],
    };

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

  it("should return message that user isn't found", async () => {
    const response = await supertest(server).get(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.notFound);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.nonExistentUser);
  });
});

describe('second scenario', () => {
  const user: IUser = {
    username: 'Adam',
    age: 32,
    hobbies: ['tennis', 'swimming'],
  };

  it('should create new user and return it', async () => {
    const response = await supertest(server).post(endpoint).send(user);

    expect(response.statusCode).toBe(StatusCode.created);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.id).not.toBe('');
    expect(response.body.username).toBe(user.username);
    expect(response.body.age).toBe(user.age);

    user.id = response.body.id;
  });

  it('should delete user by id', async () => {
    const response = await supertest(server).delete(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.noContent);
  });

  it('should return empty array', async () => {
    const expected = [];
    const response = await supertest(server).get(endpoint);

    expect(response.statusCode).toBe(StatusCode.ok);
    expect(response.body).toEqual(expected);
  });

  it("should return message that userId doesn't exist", async () => {
    const response = await supertest(server).get(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.notFound);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.nonExistentUser);
  });

  it("should return message that required fields don't match the type, method put", async () => {
    const updateUser: IUser = {
      username: 'Mira',
      age: 29,
      hobbies: ['running'],
    };

    const response = await supertest(server).put(`${endpoint}/${user.id}`).send(updateUser);

    expect(response.statusCode).toBe(StatusCode.notFound);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.nonExistentUser);
  });

  it("should return message that userId doesn't exist, method put", async () => {
    const response = await supertest(server).delete(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.notFound);
  });
});

describe('third scenario', () => {
  const id = '0123456789';

  const user: IUser = {
    username: 'Alex',
    age: 40,
    hobbies: [],
  };

  it('should return empty array', async () => {
    const expected = [];
    const response = await supertest(server).get(endpoint);

    expect(response.statusCode).toBe(StatusCode.ok);
    expect(response.body).toEqual(expected);
  });

  it('should return message that endpoint does not exist, method post', async () => {
    const response = await supertest(server).post(`${endpoint}/${id}`).send(user);

    expect(response.statusCode).toBe(StatusCode.notFound);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.nonExistentEndpoint);
  });

  it("should return message that userId isn't uuid, method get", async () => {
    const response = await supertest(server).get(`${endpoint}/${id}`);

    expect(response.statusCode).toBe(StatusCode.badRequest);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.notUuid);
  });

  it("should return message that userId isn't uuid, method put", async () => {
    const updateUser: IUser = {
      username: 'Oman',
      age: 36,
      hobbies: [],
    };

    const response = await supertest(server).put(`${endpoint}/${user.id}`).send(updateUser);

    expect(response.statusCode).toBe(StatusCode.badRequest);
    expect(response.header['content-type']).toEqual('application/json');
    expect(response.body.message).toBe(ErrorMessages.notUuid);

  });

  it("should return message that userId isn't uuid, method delete", async () => {
    const response = await supertest(server).delete(`${endpoint}/${user.id}`);

    expect(response.statusCode).toBe(StatusCode.badRequest);
  });
});