export const getTodoList = async (req, reply) => {

  const { id } = req.user;

  const { rows } = await req.server.pg.query(`
    select 
      t.body as body, 
      t.stat as stat, 
      t.created_at as created_at, 
      t.todo_uuid as todo_uuid, 
      t.is_finished as is_finished
    from todo_info t
    join users u
    on t.user_id = u.id
    where t.is_active = true and u.user_id = $1;
  `, [id]);

  return reply.status(200).send(rows);
}

export const getFilteredList = async (req, reply) => {

  const { stat } = req.params;
  const { id } = req.user;

  const { rows } = await req.server.pg.query(`
    select 
      t.body as body, 
      t.stat as stat, 
      t.created_at as created_at, 
      t.todo_uuid as todo_uuid, 
      t.is_finished as is_finished
    from todo_info t
    join users u
    on t.user_id = u.id
    where t.is_active = true and t.stat = $1 and u.user_id = $2;
  `, [stat, id]);

  return reply.status(200).send(rows);
}

//TODO: Update SQL to be in line with authentication
export const postTodo = async (req, reply) => {

  const { id } = req.user;
  const { body, stat } = req.body;

  const { rows } = await req.server.pg.query(`
    insert into todo_info(user_id, body, stat)
    values ($1, $2, $3)
    returning body, stat, created_at, todo_uuid, is_finished;
  `, [id, body, stat]);

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

  const { todo_uuid } = req.body;

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