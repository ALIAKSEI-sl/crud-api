# Simple CRUD API

Task is [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running

Run the application in development mode

```
npm run start:dev
```

Run tests scenarios for API

```
npm run test
```

Run the application in production mode

```
npm run start:prod
```

Run cluster mode with default load balancer

```
npm run start:multi
```

## API

Implemented endpoint: `api/users`

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create record about new user and store it in database

`PUT api/users/${userId}` - to update existing user (**all fields required**)

`DELETE api/users/${userId}` - to delete existing user from database

## User fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)

## Postman

You can use Postman.