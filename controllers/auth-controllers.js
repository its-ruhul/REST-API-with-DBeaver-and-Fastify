import bcrypt from 'bcrypt';

export const loginAccount = async (req, reply) => {

  const { username, password } = req.body;

  const result = await req.server.pg.query(`
    select user_id, password_hash, email_id from users
    where user_id = $1;
  `, [username]);

  const user = result.rows[0];

  if (!user) {
    reply.code(401).reply({ message: "No user found." });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    reply.code(401).reply({ message: "Invalid password." });
  }

  const payLoad = {
    id: user.id,
    email: user.email_id,
    role: 'user'
  }

  const token = req.server.jwt.sign(payLoad);

  return reply.status(200).send({ token: token });
}

export const signInAccount = async (req, reply) => {

  const { username, password, emailid } = req.body;

  const saltRounds = parseInt(process.env.SALT, 10);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { rows } = await req.server.pg.query(`
    insert into users (user_id, password_hash, email_id)
    values ($1, $2, $3)
    returning user_id as username;
  `, [username, hashedPassword, emailid]);

  return reply.status(201).send(rows[0]);
}