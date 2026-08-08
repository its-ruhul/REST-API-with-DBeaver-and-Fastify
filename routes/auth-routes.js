import { loginAccountOpts, signInAccountOpts} from '../schemas/auth-schemas.js';

export function authRoutes (fastify, options, done){

  fastify.post('/auth/login', loginAccountOpts);

  fastify.post('/auth/signin', signInAccountOpts);

  done();
}