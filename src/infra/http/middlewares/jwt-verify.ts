import { FastifyReply, FastifyRequest } from 'fastify'

export async function jwtVerify(req: FastifyRequest, res: FastifyReply) { // eslint-disable-line
  await req.jwtVerify()
}
