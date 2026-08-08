import bcrypt from 'bcrypt';

export const  loginAccount = async (req, reply) => {

  const {username, password} = req.body;

  const saltRounds = parseInt(process.env.SALT, 10);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { rows } =  await req.server.pg.query(`
    select user_id from users
    where password_hash = $1
    returning user_id;
  `, [password_hash]);

  return reply.status(200).send(rows[0]);
}

export const signInAccount = async (req, reply) => {

  const {username, password, emailid } = req.body;

  const saltRounds = parseInt(process.env.SALT, 10);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { rows } = await req.server.pg.query(`
    insert into users (user_id, password_hash, email_id)
    values ($1, $2, $3)
    returning user_id;
  `, [username, password, emailid]);

  return reply.status(201).send(rows[0]);
}