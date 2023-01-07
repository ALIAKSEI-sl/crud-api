import { validate as uuidValidate } from 'uuid';
import { StatusCode, ErrorMessages } from './responseMessages';
import { IdoesExistEndpoint } from './model.doesExistEndpoint';
import dataBase from '../user/dataBase.json';

export function checkEndpoint(url: string, method: string): IdoesExistEndpoint {
  try {
    const [api, users, id, ...rest] = url.split('/').filter(Boolean);
    if (api !== 'api' || users !== 'users' || rest.length !== 0) {
      return {
        code: StatusCode.notFound,
        message: ErrorMessages.nonExistentEndpoint,
        flag: false,
      };
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
          }
          if (!dataBase.find((u) => u.id === id)) {
            return {
              code: StatusCode.notFound,
              message: ErrorMessages.nonExistentUser,
              flag: false,
            };
          }
        } else {
          return {
            code: StatusCode.notFound,
            message: ErrorMessages.nonExistentEndpoint,
            flag: false,
          };
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
          }
          if (!dataBase.find((u) => u.id === id)) {
            return {
              code: StatusCode.notFound,
              message: ErrorMessages.nonExistentUser,
              flag: false,
            };
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
        }
        break;
      default:
        return {
          code: StatusCode.badRequest,
          message: ErrorMessages.unsupportedMethod,
          flag: false,
        };
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
  }
}