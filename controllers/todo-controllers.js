export const getTodoList = async (req, reply) => {

  const { rows } = await req.server.pg.query('select body, created_at from todo_info where is_active = true ');

  return reply.status(201).send(rows);

}

export const getFilteredList = async (req, reply) => {

  const { rows } = await req.server.pg.query();

  return reply.status(201).send();
}

export const postTodo = async (req, reply) => {

  const { rows } = await req.server.pg.query();

  return reply.status(201).send();
}

export const updateTodo = async (req, reply) => {

  const { rows } = await req.server.pg.query();

  return reply.status(201).send();
}

export const finishTodo = async (req, reply) => {
  
  const { rows } = await req.server.pg.query();

  return reply.status(201).send();
}

export const deleteTodo = async (req, reply) => {

  const { rows } = await req.server.pg.query();

  return reply.status(201).send();
}