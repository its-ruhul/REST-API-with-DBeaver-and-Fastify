export const authenticate = async (req, reply) => {
  try {
    await req.jwtVerify();
  }
  catch (error) {
    reply.code(500).send({ message: "Authentication Failed." });
  }
}