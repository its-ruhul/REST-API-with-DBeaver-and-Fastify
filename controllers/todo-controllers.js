export const getTodoList = async (req, reply) => {

  const { rows } = await req.server.pg.query(`
    select body, stat, created_at, todo_uuid from todo_info 
    where is_active = true;
  `);

  return reply.status(201).send(rows);

}

export const getFilteredList = async (req, reply) => {

  const {stat} = req.params;

  const { rows } = await req.server.pg.query(`
    select body, stat, created_at, todo_uuid from todo_info 
    where is_active = true and stat = $1;
  `, [stat]);

  return reply.status(201).send(rows);
}

export const postTodo = async (req, reply) => {

  const {body, stat} = req.body;

  //TODO: After Authentication put the user_id
  const { rows } = await req.server.pg.query(`
    insert into todo_info(user_id, body, stat)
    values (1, $1, $2)
    returning  body, stat, created_at, todo_uuid;
  `, [body, stat]);

  return reply.status(201).send(rows[0]);
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