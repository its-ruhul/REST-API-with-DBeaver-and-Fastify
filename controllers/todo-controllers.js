export const getTodoList = async (req, reply) => {

  const { rows } = await req.server.pg.query(`
    select body, stat, created_at, todo_uuid, is_finished from todo_info 
    where is_active = true;
  `);

  return reply.status(200).send(rows);
}

export const getFilteredList = async (req, reply) => {

  const {stat} = req.params;

  const { rows } = await req.server.pg.query(`
    select body, stat, created_at, todo_uuid, is_finished from todo_info 
    where is_active = true and stat = $1;
  `, [stat]);

  return reply.status(200).send(rows);
}

export const postTodo = async (req, reply) => {

  const {body, stat} = req.body;

  //TODO: After Authentication put the user_id
  const { rows } = await req.server.pg.query(`
    insert into todo_info(user_id, body, stat)
    values (1, $1, $2)
    returning  body, stat, created_at, todo_uuid, is_finished;
  `, [body, stat]);

  return reply.status(201).send(rows[0]);
}

export const updateTodo = async (req, reply) => {

  const { body, stat, todo_uuid } = req.body;

  const { rows } = await req.server.pg.query(`
    update todo_info
    set body = $1, stat = $2
    where todo_uuid = $3 and is_active = true
    returning body, stat, created_at, todo_uuid, is_finished;
  `, [body, stat, todo_uuid]);

  return reply.status(201).send(rows[0]);
}

export const finishTodo = async (req, reply) => {

  const {todo_uuid} = req.body;
  
  const { rows } = await req.server.pg.query(`
    update todo_info
    set is_finished = true
    where todo_uuid = $1 and is_active = true
    returning body, stat, created_at, todo_uuid, is_finished;
  `);

  return reply.status(201).send(rows[0]);
}

export const deleteTodo = async (req, reply) => {

  const { rows } = await req.server.pg.query(`
    update todo_info
    set is_active = false
    where todo_uuid = $1 and is_active = true
    returning is_active;
  `);

  return reply.status(201).send(rows[0]);
}