import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/users/authenticate-user'
import { BcryptEncrypter } from '@/infra/auth/cryptography/bcrypt-encrypter'
import { FastifyJwtEncoder } from '@/infra/auth/cryptography/fastify-jwt-encoder'
import { PrismaUsersRepository } from '@/infra/database/prisma/respositories/prisma-users-repositorie'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function AuthenticateUserController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const body = bodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()
  const encypter = new BcryptEncrypter()
  const encoder = new FastifyJwtEncoder(res)
  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    encypter,
    encoder,
  )

  const resp = await useCase.execute(body)

  if (resp.isLeft()) {
    if (resp.value instanceof ResourceNotFoundError) {
      res.status(404).send(resp.value.message)
    }

    if (resp.value instanceof UnauthorizedError) {
      res.status(401).send(resp.value.message)
    }
    res.status(400).send(resp.value.message)
  }

  if (resp.isRight()) {
    const { token } = resp.value
    res.status(200).send({ token })
  }
}
