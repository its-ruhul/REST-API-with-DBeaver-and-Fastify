import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { todoRoutes } from "./routes/todo-route.js";
import { authRoutes } from "./routes/auth-routes.js";
import fastifyJwt from "@fastify/jwt";

const PORT = process.env.PORT || 3000;

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyJwt, {
  secret: process.env.SECRET_KEY
});

fastify.register(todoRoutes);
fastify.register(authRoutes);

fastify.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();

