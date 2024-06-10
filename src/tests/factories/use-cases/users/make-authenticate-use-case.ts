import { Encoder } from '@/domain/application/cryptography/encoder'
import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/users/authenticate-user'
import { FakeEncoder } from '@/tests/cryptography/fake-encoder'
import { FakeEncrypter } from '@/tests/cryptography/fake-encrypter'
import { InMemoryUsersRepository } from '@/tests/respositories/in-memory-users-repository'

export function makeAuthenticateUseCase(props?: {
  usersRepoSub?: UsersRepository
  encypterSub?: Encrypter
  encoderSub?: Encoder
}) {
  const usersRepository = props?.usersRepoSub ?? new InMemoryUsersRepository()
  const encypter = props?.encypterSub ?? new FakeEncrypter()
  const encoder = props?.encoderSub ?? new FakeEncoder()

  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    encypter,
    encoder,
  )

  return {
    useCase,
    dependencies: {
      usersRepository,
      encypter,
      encoder,
    },
  }
}
