import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { todoRoutes } from "./routes/todo-route.js";

const PORT = process.env.PORT || 3000;

const fastify = Fastify({
  logger: true
});

fastify.register(todoRoutes);

fastify.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL
})

const start = async () => {
  try{
    await fastify.listen({port : PORT});
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();

