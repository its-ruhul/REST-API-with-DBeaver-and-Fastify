import { loginAccount, signInAccount } from '../controllers/auth-controllers.js'

const loginBody = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  }
}

const signInBody = {
  type: 'object',
  required: ['username', 'password', 'emailid'],
  properties: {
    username: { type: 'string', minLength: 4, maxLength: 12 },
    password: { type: 'string', minLength: 8, maxLength: 24 },
    emailid: { type: 'string', format: 'email' }
  }
}

const loginResponse = {
  type: 'object',
  properties: {
    token: { type: 'string' }
  }
}

//SCHEMAS

export const loginAccountOpts = {
  schema: {
    body: loginBody,
    response: {
      200: loginResponse
    }
  },
  handler: loginAccount
}

export const signInAccountOpts = {
  schema: {
    body: signInBody,
    response: {
      201: loginResponse
    }
  },
  handler: signInAccount
}