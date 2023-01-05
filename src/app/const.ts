
export const enum StatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  internalServerError = 500,
}

export const enum ErrorMessages {
  invalidUser = 'userId is invalid',
  nonExistentUser = "userId doesn't exist",
  requiredFields = "body doesn't contain required fields",
}
