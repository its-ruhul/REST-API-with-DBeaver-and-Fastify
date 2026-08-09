export const authenticate = async (req, reply) => {
  try {
    await req.jwtVerify();
  }
  catch (error) {
    return reply.code(401).send({ message: "Authentication Failed.", error: error.message });
  }
}