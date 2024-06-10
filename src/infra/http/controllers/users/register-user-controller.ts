import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/domain/application/use-cases/users/register-user'
import { BcryptEncrypter } from '@/infra/auth/cryptography/bcrypt-encrypter'
import { PrismaUsersRepository } from '@/infra/database/prisma/respositories/prisma-users-repositorie'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function RegisterUserController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const body = bodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()
  const encypter = new BcryptEncrypter()
  const useCase = new RegisterUserUseCase(usersRepository, encypter)

  const resp = await useCase.execute(body)

  if (resp.isLeft()) {
    if (resp.value instanceof UserAlreadyExistsError) {
      res.status(409).send(resp.value.message)
    }
    res.status(400).send(resp.value.message)
  }

  if (resp.isRight()) {
    res.status(201)
  }
}
