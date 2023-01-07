//import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as uuidValidate } from 'uuid';
import { StatusCode, ErrorMessages } from './responseMessages';
import dataBase from '../user/dataBase.json';

export function checkEndpoint(url, method) {
  try {
    //const { url, method } = req;
    const [api, users, id, ...rest] = url.split('/').filter(Boolean);
    if (api !== 'api' || users !== 'users' || rest.length !== 0) {
      return {
        code: StatusCode.notFound,
        message: ErrorMessages.nonExistentEndpoint,
        flag: false,
      };
      // res.writeHead(StatusCode.notFound);
      // res.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
      // return false;
    }

    switch (method) {
      case 'PUT':
      case 'DELETE':
        if (id) {
          if (!uuidValidate(id)) {
            return {
              code: StatusCode.badRequest,
              message: ErrorMessages.notUuid,
              flag: false,
            };
            // res.writeHead(StatusCode.badRequest);
            // res.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.notUuid }));
            // return false;
          }
          if (!dataBase.find((u) => u.id === id)) {
            return {
              code: StatusCode.notFound,
              message: ErrorMessages.nonExistentUser,
              flag: false,
            };
            // res.writeHead(StatusCode.notFound);
            // res.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentUser }));
            // return false;
          }
        } else {
          return {
            code: StatusCode.notFound,
            message: ErrorMessages.nonExistentEndpoint,
            flag: false,
          };
          // res.writeHead(StatusCode.notFound);
          // res.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
          // return false;
        }
        break;
      case 'GET':
        if (id) {
          if (!uuidValidate(id)) {
            return {
              code: StatusCode.badRequest,
              message: ErrorMessages.notUuid,
              flag: false,
            };
            // res.writeHead(StatusCode.badRequest);
            // res.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.notUuid }));
            // return false;
          }
          if (!dataBase.find((u) => u.id === id)) {
            return {
              code: StatusCode.notFound,
              message: ErrorMessages.nonExistentUser,
              flag: false,
            };
            // res.writeHead(StatusCode.notFound);
            // res.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentUser }));
            // return false;
          }
        }
        break;
      case 'POST':
        if (id) {
          return {
            code: StatusCode.notFound,
            message: ErrorMessages.nonExistentEndpoint,
            flag: false,
          };
          // res.writeHead(StatusCode.notFound);
          // res.end(JSON.stringify({ code: StatusCode.notFound, message: ErrorMessages.nonExistentEndpoint }));
          // return false;
        }
        break;
      default:
        return {
          code: StatusCode.badRequest,
          message: ErrorMessages.unsupportedMethod,
          flag: false,
        };
        // res.writeHead(StatusCode.badRequest);
        // res.end(JSON.stringify({ code: StatusCode.badRequest, message: ErrorMessages.unsupportedMethod }));
        // return false;
    }
    if (id) {
      return {
        code: StatusCode.ok,
        message: ErrorMessages.ok,
        flag: true,
        id,
      };
    } else {
      return {
        code: StatusCode.ok,
        message: ErrorMessages.ok,
        flag: true,
      };
    }
    
  } catch {
    return {
      code: StatusCode.internalServerError,
      message: ErrorMessages.serverError,
      flag: false,
    };
    // res.writeHead(StatusCode.internalServerError);
    // res.end(JSON.stringify({ code: StatusCode.internalServerError, message: ErrorMessages.serverError }));
    // return false;
  }
}